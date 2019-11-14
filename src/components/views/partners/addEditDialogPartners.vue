<template>
    <dialog-template
        :value="value"
        @input="setValue"
        persistent
        scrollable
        max-width="800px"
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
                    <validate ref="name" mode="eager" rules="required|max:99" name="Nama Partner" v-slot="{errors}">
                        <input-field
                            label="Nama Partner"
                            v-model="partners.name"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col>
                            <validate ref="image" rules="required|imageHaveError" name="Gambar Partner" v-slot="{validate,errors}">
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
                                    :pre-defined-image="editImagePartner"
                                    max-size="500"
                                    title="Partner"
                                    prefix="vendor"
                                    v-model="imagePartner"
                                    :error-message="errors[0]"
                                    ref="imagePartner"
                                ></file-upload>
                            </validate>
                        </v-col>
                        <v-col>
                            <validate ref="logo" rules="required|imageHaveError" name="Logo Partner" v-slot="{validate,errors}">
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
                                    :pre-defined-image="editImageLogo"
                                    max-size="500"
                                    title="Logo"
                                    prefix="vendor"
                                    v-model="imageLogo"
                                    :error-message="errors[0]"
                                    ref="imageLogo"
                                ></file-upload>
                            </validate>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <validate ref="category_id" mode="eager" rules="required" name="Daftar Produk" v-slot="{errors}">
                        <select-input-field v-model="selectedProduct" label="Daftar Produk" multiple item-text="category_name" :item-value="['id','category_name']" return-object :items="listOfProducts" :error="errors[0]"></select-input-field>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <h3 class="mb-1">Deskripsi Partner</h3>
                    <validate tag="div" class="d-flex flex-column" ref="description" rules="requiredRichText" name="Deskripsi" v-slot="{errors}">
                        <rich-text ref="descriptionRichText" v-model="partners.description" :pre-defined-text="editDescription" :error-message="errors[0]"></rich-text>
                    </validate>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import validatorComponents from '@/mixins/validatorComponents.mixins';
import PartnersAPI from '@/api/PartnersAPI';
import ProductsAPI from '@/api/ProductsAPI';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
const fileUpload = () => import('@/components/reuseable/fileUpload');
const selectInputField = () => import('@/components/reuseable/selectInputField');
const richText = () => import('@/components/reuseable/richText');
export default {
    name: 'addEditDialogPartners',
    components: {
        dialogTemplate,
        inputField,
        fileUpload,
        richText,
        selectInputField,
    },
    mixins: [validatorComponents],
    data: () => ({
        dialog: false,
        imagePartner: [],
        imageLogo: [],
        editDescription: '',
        editImagePartner: [],
        editImageLogo: [],
        selectedProduct: [],
        listOfProducts: [],
        partners: {
            name: '',
            image: '',
            logo: '',
            description: '',
            category_id: [],
        },
        partnersAPI: null,
        productsAPI: null,
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
            return this.isEdit ? `Ubah Partner ${this.editAttributes.name}` : 'Tambah Partner';
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
    mounted() {
        this.getListProducts();
    },
    methods: {
        iniApi() {
            this.partnersAPI = new PartnersAPI();
            this.productsAPI = new ProductsAPI();
        },
        setValue(value) {
            this.$emit('input', value);
        },
        reFetchDataPartners() {
            this.$emit('reFetch');
        },
        closeDialog(reset) {
            this.setValue(false);
            if (this.isEdit) this.resetForm();
            if (reset) this.reFetchDataPartners();
        },
        async getListProducts() {
            try {
                const result = await this.productsAPI.getProducts({ limit: 9999 });
                this.listOfProducts = result.data.result;
            } catch (error) {
                this.$error(error, {
                    default() {
                        console.log('ini error', error);
                    },
                });
            }
        },
        async submitDialog() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (!isValid) return;
            try {
                this.loading = true;
                this.partners = {
                    ...this.partners,
                    image: this.imagePartner[0].files,
                    logo: this.imageLogo[0].files,
                    category_id: this.selectedProduct.map(eachData => eachData.id),
                };
                if (this.isEdit) {
                    await this.partnersAPI.updatePartners(this.editId, this.partners);
                    this.afterSuccessEditPartners();
                } else {
                    await this.partnersAPI.savePartners(this.partners);
                    this.afterSuccessSavePartners();
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
        },
        resetForm() {
            this.$refs.imagePartner.reset();
            this.$refs.imageLogo.reset();
            this.$refs.descriptionRichText.reset();
            this.partners = {
                name: '',
                image: '',
                logo: '',
                description: '',
                category_id: [],
            };
            this.editDescription = '';
            this.editImagePartner = [];
            this.editImageLogo = [];
            this.imagePartner = [];
            this.imageLogo = [];
            this.selectedProduct = [];
            setTimeout(() => {
                this.$refs.validateGroup.reset();
            }, 1000);
        },
        afterSuccessSavePartners() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Menambahkan Partner', 2000);
            this.resetForm();
            this.closeDialog(true);
        },
        afterSuccessEditPartners() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Edit Partner', 2000);
            this.closeDialog(true);
        },
        mapEditedValue() {
            this.partners = {
                ...this.partners,
                name: this.editAttributes.name,
            };
            this.selectedProduct = this.editAttributes.service.map(eachData => ({
                category_name: eachData.category.category_name,
                id: eachData.category.id,
            }));
            this.editImagePartner.push({
                ...this.editAttributes.image,
            });
            this.editImageLogo.push({
                ...this.editAttributes.logo,
            });
            this.editDescription = this.editAttributes.description;
            this.editId = this.editAttributes.id;
        },
    },
};
</script>
