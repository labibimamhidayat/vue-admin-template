<template>
    <v-row>
        <confirm-dialog v-model="deleteConfirmDialog" type-confirm="delete" :confirm="deleteItems" :call-back-submit="onDeleteProduct" @reFetch="getProducts"></confirm-dialog>
        <addEditDialogProduct v-model="addAndEditDialog" :is-edit="isEdit" :edit-attributes="editAttributes" @reFetch="getProducts"></addEditDialogProduct>
        <v-col>
            <v-row>
                <v-col>
                    <v-btn color="success" @click="openDialogAddProduct">Tambah Produk Baru</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <data-tables
                        :headers="headers"
                        :items="productItems"
                        :table-properties="tableProperties"
                        :loading="loadingTable"
                        @pagination="changePagination"
                    >
                        <template #body="{items}">
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.category_name }}</td>
                                    <td>
                                        <img style="weight: 90px; height:90px;" :src="item.image.fullUrl">
                                    </td>
                                    <td>{{ item.short_description }}</td>
                                    <td>
                                        <v-btn color="primary" @click="openDialogEditProduct(item)" fab icon x-small>
                                            <v-icon>fas fa-pencil-alt</v-icon>
                                        </v-btn>
                                        <v-btn color="error" @click="confirmDeleteProduct({name: item.category_name, id: item.id})" fab icon x-small>
                                            <v-icon>fas fa-trash</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </data-tables>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import ProductsAPI from '@/api/ProductsAPI';
import tableProperties from '@/mixins/tableProperties.mixins';

const dataTables = () => import('@/components/reuseable/dataTable');
const addEditDialogProduct = () => import('@/components/views/products/addEditDialogProduct');
const confirmDialog = () => import('@/components/reuseable/confirmDialog');
export default {
    name: 'viewProduct',
    components: {
        dataTables,
        addEditDialogProduct,
        confirmDialog,
    },
    mixins: [tableProperties],
    data: () => ({
        headers: [
            {
                text: 'Product Name',
                sortable: false,
            },
            {
                text: 'Image',
                sortable: false,
            },
            {
                text: 'Descriptions',
                sortable: false,
            },
            {
                text: 'Actions',
                sortable: false,
            },
        ],
        productItems: [],
        deleteItems: {
            title: '',
            body: '',
            id: '',
        },
        editAttributes: {},
        productApi: null,
        addAndEditDialog: false,
        deleteConfirmDialog: false,
        isEdit: false,
    }),
    created() {
        this.initApi();
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        initApi() {
            this.productApi = new ProductsAPI();
        },
        async getProducts() {
            try {
                this.loadingTable = true;
                const result = await this.productApi.getProducts(this.tableProperties);
                this.productItems = result.data.result;
                this.setTableProperties(result.data.pagination);
            } catch (error) {
                this.$error(error);
            } finally {
                this.loadingTable = false;
            }
        },
        getDataByPagination() {
            this.getProducts();
        },
        openDialogAddProduct() {
            this.isEdit = false;
            this.addAndEditDialog = true;
        },
        openDialogEditProduct(objectProduct) {
            this.isEdit = true;
            this.editAttributes = { ...objectProduct };
            this.addAndEditDialog = true;
        },
        confirmDeleteProduct(deleteItems) {
            this.deleteItems = {
                title: `Hapus Produk ${deleteItems.name}`,
                body: 'Apakah anda yakin akan menghapus produk ini?',
                id: deleteItems.id,
            };
            this.deleteConfirmDialog = true;
        },
        async onDeleteProduct() {
            try {
                await this.productApi.deleteProducts(this.deleteItems.id);
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
