<template>
    <v-row>
        <confirm-dialog v-model="deleteConfirmDialog" type-confirm="delete" :confirm="deleteItems" :call-back-submit="onDeleteClients" @reFetch="getClients"></confirm-dialog>
        <add-edit-dialog-clients v-model="addAndEditDialog" :is-edit="isEdit" :edit-attributes="editAttributes" @reFetch="getClients"></add-edit-dialog-clients>
        <v-col>
            <v-row>
                <v-col>
                    <v-btn color="success" @click="openDialogAddClients">Tambah Clients</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <data-tables
                        :headers="headers"
                        :items="clientsItems"
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
                                        <v-btn color="primary" @click="openDialogEditClients(item)" fab icon x-small>
                                            <v-icon>fas fa-pencil-alt</v-icon>
                                        </v-btn>
                                        <v-btn color="error" @click="confirmDeleteClients({name: item.name, id: item.id})" fab icon x-small>
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
import ClientsAPI from '@/api/ClientsAPI';
import tableProperties from '@/mixins/tableProperties.mixins';

const dataTables = () => import('@/components/reuseable/dataTable');
const addEditDialogClients = () => import('@/components/views/clients/addEditDialogClients');
const confirmDialog = () => import('@/components/reuseable/confirmDialog');
export default {
    name: 'viewClients',
    components: {
        dataTables,
        addEditDialogClients,
        confirmDialog,
    },
    mixins: [tableProperties],
    data: () => ({
        headers: [
            {
                text: 'Client Name',
                sortable: false,
            },
            {
                text: 'Image',
                sortable: false,
            },
            {
                text: 'Actions',
                sortable: false,
            },
        ],
        clientsItems: [],
        deleteItems: {
            title: '',
            body: '',
            id: '',
        },
        editAttributes: {},
        clientsAPI: null,
        addAndEditDialog: false,
        deleteConfirmDialog: false,
        isEdit: false,
    }),
    created() {
        this.initApi();
    },
    mounted() {
        this.getClients();
    },
    methods: {
        initApi() {
            this.clientsAPI = new ClientsAPI();
        },
        async getClients() {
            try {
                this.loadingTable = true;
                const result = await this.clientsAPI.getClients(this.tableProperties);
                this.clientsItems = result.data.result;
                this.setTableProperties(result.data.pagination);
            } catch (error) {
                this.$error(error);
            } finally {
                this.loadingTable = false;
            }
        },
        getDataByPagination() {
            this.getClients();
        },
        openDialogAddClients() {
            this.isEdit = false;
            this.addAndEditDialog = true;
        },
        openDialogEditClients(objectProduct) {
            this.isEdit = true;
            this.editAttributes = { ...objectProduct };
            this.addAndEditDialog = true;
        },
        confirmDeleteClients(deleteItems) {
            this.deleteItems = {
                title: `Hapus Client ${deleteItems.name}`,
                body: 'Apakah anda yakin akan menghapus client ini?',
                id: deleteItems.id,
            };
            this.deleteConfirmDialog = true;
        },
        async onDeleteClients() {
            try {
                await this.clientsAPI.deleteClients(this.deleteItems.id);
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
};
</script>
