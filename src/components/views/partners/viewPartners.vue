<template>
    <v-row>
        <confirm-dialog v-model="deleteConfirmDialog" type-confirm="delete" :confirm="deleteItems" :call-back-submit="onDeletePartners" @reFetch="getPartners"></confirm-dialog>
        <add-edit-dialog-partners v-model="addAndEditDialog" :is-edit="isEdit" :edit-attributes="editAttributes" @reFetch="getPartners"></add-edit-dialog-partners>
        <v-col>
            <v-row>
                <v-col>
                    <v-btn color="success" @click="openDialogAddPartners">Tambah Partner Baru</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <data-tables
                        :headers="headers"
                        :items="partnerItems"
                        :table-properties="tableProperties"
                        :loading="loadingTable"
                        @pagination="changePagination"
                    >
                        <template #body="{items}">
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td>
                                        <img style="weight: 90px; height:90px;" :src="item.image.fullUrl">
                                    </td>
                                    <td>
                                        <img style="weight: 90px; height:90px;" :src="item.logo.fullUrl">
                                    </td>
                                    <td>{{ item.description | sanitize }}</td>
                                    <td>
                                        <template v-for="(product, index) in item.service">
                                            <v-chip small class="ma-1" :key="index">{{product.category.category_name}}</v-chip>
                                        </template>
                                    </td>
                                    <td>
                                        <v-btn color="primary" @click="openDialogEditPartners(item)" fab icon x-small>
                                            <v-icon>fas fa-pencil-alt</v-icon>
                                        </v-btn>
                                        <v-btn color="error" @click="confirmDeletePartners({name: item.name, id: item.id})" fab icon x-small>
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
import PartnersAPI from '@/api/PartnersAPI';
import tableProperties from '@/mixins/tableProperties.mixins';
import sanitizeHTML from '@/helper/sanitizeHTML';

const dataTables = () => import('@/components/reuseable/dataTable');
const addEditDialogPartners = () => import('@/components/views/partners/addEditDialogPartners');
const confirmDialog = () => import('@/components/reuseable/confirmDialog');
export default {
    name: 'viewPartners',
    components: {
        dataTables,
        addEditDialogPartners,
        confirmDialog,
    },
    mixins: [tableProperties],
    filters: {
        sanitize: html => sanitizeHTML(html),
    },
    data: () => ({
        headers: [
            {
                text: 'Name',
                sortable: false,
            },
            {
                text: 'Image',
                sortable: false,
            },
            {
                text: 'Logo',
                sortable: false,
            },
            {
                text: 'Description',
                sortable: false,
            },
            {
                text: 'Product',
                sortable: false,
            },
            {
                text: 'Actions',
                sortable: false,
            },
        ],
        partnerItems: [],
        deleteItems: {
            title: '',
            body: '',
            id: '',
        },
        editAttributes: {},
        partnersAPI: null,
        addAndEditDialog: false,
        deleteConfirmDialog: false,
        isEdit: false,
    }),
    created() {
        this.initApi();
    },
    mounted() {
        this.getPartners();
    },
    methods: {
        initApi() {
            this.partnersAPI = new PartnersAPI();
        },
        async getPartners() {
            try {
                this.loadingTable = true;
                const result = await this.partnersAPI.getPartners(this.tableProperties);
                this.partnerItems = result.data.result;
                this.setTableProperties(result.data.pagination);
            } catch (error) {
                this.$error(error);
            } finally {
                this.loadingTable = false;
            }
        },
        getDataByPagination() {
            this.getPartners();
        },
        openDialogAddPartners() {
            this.isEdit = false;
            this.addAndEditDialog = true;
        },
        openDialogEditPartners(objectPartners) {
            this.isEdit = true;
            this.editAttributes = { ...objectPartners };
            this.addAndEditDialog = true;
        },
        confirmDeletePartners(deleteItems) {
            this.deleteItems = {
                title: `Hapus Partner ${deleteItems.name}`,
                body: 'Apakah anda yakin akan menghapus partner ini?',
                id: deleteItems.id,
            };
            this.deleteConfirmDialog = true;
        },
        async onDeletePartners() {
            try {
                await this.partnersAPI.deletePartners(this.deleteItems.id);
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
