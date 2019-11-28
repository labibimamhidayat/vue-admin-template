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
                    <validate ref="category_name" mode="eager" rules="required|max:99" name="Nama Kategori" v-slot="{errors}">
                        <input-field
                            label="Nama Kategori"
                            v-model="category.category_name"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col>
                    <validate ref="image" rules="required|imageHaveError" name="Gambar Produk" v-slot="{validate,errors}">
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
                            :pre-defined-image="editImageProduct"
                            max-size="500"
                            title="Produk"
                            prefix="category"
                            v-model="imageProduct"
                            :error-message="errors[0]"
                            ref="imageProduct"
                        ></file-upload>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <validate ref="short_description" mode="eager" rules="required|max:200" name="Deskripsi Singkat" v-slot="{errors}">
                        <input-field
                            label="Deskripsi Singkat"
                            v-model="category.short_description"
                            :error="errors[0]"
                            textarea
                        ></input-field>
                    </validate>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import validatorComponents from '@/mixins/validatorComponents.mixins';
import ProductsAPI from '@/api/ProductsAPI';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
const fileUpload = () => import('@/components/reuseable/fileUpload');
export default {
    name: 'addEditDialogProduct',
    components: {
        dialogTemplate,
        inputField,
        fileUpload,
    },
    mixins: [validatorComponents],
    data: () => ({
        dialog: false,
        imageProduct: [],
        editImageProduct: [],
        category: {
            category_name: '',
            image: '',
            short_description: '',
        },
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
            return this.isEdit ? 'Update' : 'Save';
        },
        headerText() {
            return this.isEdit ? `Edit Product ${this.editAttributes.category_name}` : 'Add Product';
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
            this.productsAPI = new ProductsAPI();
        },
        setValue(value) {
            this.$emit('input', value);
        },
        reFetchDataProducts() {
            this.$emit('reFetch');
        },
        closeDialog(reset) {
            this.setValue(false);
            if (this.isEdit) this.resetForm();
            if (reset) this.reFetchDataProducts();
        },
        async submitDialog() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (isValid) {
                try {
                    this.loading = true;
                    this.category = {
                        ...this.category,
                        image: this.imageProduct[0].files,
                    };
                    if (this.isEdit) {
                        await this.productsAPI.updateProducts(this.editId, this.category);
                        this.afterSuccessEditProduct();
                    } else {
                        await this.productsAPI.saveProducts(this.category);
                        this.afterSuccessSaveProduct();
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
            this.$refs.imageProduct.reset();
            this.category = {
                category_name: '',
                image: '',
                short_description: '',
            };
            this.editImageProduct = [];
            this.imageProduct = [];
            requestAnimationFrame(() => {
                this.$refs.validateGroup.reset();
            });
        },
        afterSuccessSaveProduct() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Menambahkan Product', 2000);
            this.resetForm();
            this.closeDialog(true);
        },
        afterSuccessEditProduct() {
            this.$bus.$emit('snackbar', 'success', 'Berhasil Edit Product', 2000);
            this.closeDialog(true);
        },
        mapEditedValue() {
            this.category = {
                ...this.category,
                category_name: this.editAttributes.category_name,
                short_description: this.editAttributes.short_description,
            };
            this.editImageProduct.push({
                ...this.editAttributes.image,
            });
            this.editId = this.editAttributes.id;
        },
    },
};
</script>
