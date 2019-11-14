<template>
    <dialog-template
        :value="value"
        @input="setValue"
        persistent
        scrollable
        max-width="600px"
        height="500px"
        :header-text="headerText"
        @closeDialog="closeDialog"
        @submitDialog="submitDialog"
        :submit-button-text="submitButtonText"
        :loading-btn-submit="loading"
    >
        <v-card-text>
            <validate-group tag="div" ref="validateGroup" class="row">
                <v-col cols="12">
                    <validate ref="name" mode="eager" rules="required|max:99" name="Nama Client" v-slot="{errors}">
                        <input-field
                            label="Nama Client"
                            v-model="client.name"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col>
                    <validate ref="image" rules="required|imageHaveError" name="Gambar Client" v-slot="{validate,errors}">
                        <file-upload
                            :accepted-mime="[
                                {
                                    mime: 'image/png',
                                    name: 'PNG',
                                },
                                {
                                    mime: 'image/jpeg',
                                    name: 'JPEG / JPG'
                                }
                            ]"
                            :pre-defined-image="editImageClients"
                            max-size="500"
                            title="Client"
                            prefix="client"
                            v-model="imageClients"
                            :error-message="errors[0]"
                            ref="imageClients"
                        ></file-upload>
                    </validate>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import validatorComponents from '@/mixins/validatorComponents.mixins';
import ClientsAPI from '@/api/ClientsAPI';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
const fileUpload = () => import('@/components/reuseable/fileUpload');
export default {
    name: 'addEditDialogClient',
    components: {
        dialogTemplate,
        inputField,
        fileUpload,
    },
    mixins: [validatorComponents],
    data: () => ({
        dialog: false,
        imageClients: [],
        editImageClients: [],
        client: {
            name: '',
            image: '',
        },
        clientsAPI: null,
        loading: false,
        editId: '',
    }),
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        editAttributes: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        submitButtonText() {
            return this.isEdit ? 'Ubah' : 'Simpan';
        },
        headerText() {
            return this.isEdit ? `Edit Client ${this.editAttributes.name}` : 'Tambah Client';
        },
    },
    watch: {
        value(val) {
            if (val && Object.keys(this.editAttributes).length && this.isEdit) {
                this.mapEditedValue();
            }
        },
    },
    created() {
        this.iniApi();
    },
    methods: {
        iniApi() {
            this.clientsAPI = new ClientsAPI();
        },
        setValue(value) {
            this.$emit('input', value);
        },
        reFetchDataClients() {
            this.$emit('reFetch');
        },
        closeDialog(reset) {
            this.setValue(false);
            if (this.isEdit) this.resetForm();
            if (reset) this.reFetchDataClients();
        },
        async submitDialog() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (isValid) {
                try {
                    this.loading = true;
                    this.client = {
                        ...this.client,
                        image: this.imageClients[0].files,
                    };
                    if (this.isEdit) {
                        await this.clientsAPI.updateClients(this.editId, this.client);
                        this.afterSuccessEditClient();
                    } else {
                        await this.clientsAPI.saveClients(this.client);
                        this.afterSuccessSaveClient();
                    }
                } catch (error) {
                    this.$error(error, {
                        badRequest() {
                            console.log('ini error', error.response);
                        },
                        default() {
                            console.log('ini error default', error);
                        },
                    });
                } finally {
                    this.loading = false;
                }
            }
        },
        resetForm() {
            this.$refs.imageClients.reset();
            this.client = {
                name: '',
                image: '',
            };
            this.editImageClients = [];
            this.imageClients = [];
            requestAnimationFrame(() => {
                this.$refs.validateGroup.reset();
            });
        },
        afterSuccessSaveClient() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Menambahkan CLient', 2000);
            this.resetForm();
            this.closeDialog(true);
        },
        afterSuccessEditClient() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Edit Client', 2000);
            this.closeDialog(true);
        },
        mapEditedValue() {
            this.client = {
                ...this.client,
                name: this.editAttributes.name,
            };
            this.editImageClients.push({
                ...this.editAttributes.image,
            });
            this.editId = this.editAttributes.id;
        },
    },
};
</script>
