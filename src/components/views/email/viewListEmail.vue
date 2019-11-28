<template>
    <v-row>
        <change-email-receiver-dialog v-model="changeEmailReceiverDialog"></change-email-receiver-dialog>
        <v-col>
            <v-row>
                <v-col>
                    <v-btn color="success" @click="openDialogChangeEmailReceiver">Change Email Receiver</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <data-tables
                        :headers="headers"
                        :items="emailItems"
                        :table-properties="tableProperties"
                        :loading="loadingTable"
                        @pagination="changePagination"
                    >
                        <template #body="{items}">
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>{{ item.phone_number }}</td>
                                    <td>{{ item.subject }}</td>
                                    <td>{{ item.message_email }}</td>
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
import EmailAPI from '@/api/EmailAPI';
import tableProperties from '@/mixins/tableProperties.mixins';

const dataTables = () => import('@/components/reuseable/dataTable');
const changeEmailReceiverDialog = () => import('@/components/views/email/changeEmailReceiverDialog.vue');
export default {
    name: 'viewEmailList',
    components: {
        dataTables,
        changeEmailReceiverDialog,
    },
    mixins: [tableProperties],
    data: () => ({
        headers: [
            {
                text: 'Product Name',
                sortable: false,
            },
            {
                text: 'Email',
                sortable: false,
            },
            {
                text: 'Phone Number',
                sortable: false,
            },
            {
                text: 'Subject',
                sortable: false,
            },
            {
                text: 'Message',
                sortable: false,
            },
        ],
        emailItems: [],
        emailAPI: null,
        changeEmailReceiverDialog: false,
    }),
    created() {
        this.initApi();
    },
    mounted() {
        this.getListOfEmails();
    },
    methods: {
        initApi() {
            this.emailAPI = new EmailAPI();
        },
        async getListOfEmails() {
            try {
                this.loadingTable = true;
                const result = await this.emailAPI.getListOfEmails(this.tableProperties);
                this.emailItems = result.data.result;
                this.setTableProperties(result.data.pagination);
            } catch (error) {
                this.$error(error);
            } finally {
                this.loadingTable = false;
            }
        },
        getDataByPagination() {
            this.getListOfEmails();
        },
        openDialogChangeEmailReceiver() {
            this.changeEmailReceiverDialog = true;
        },
    },
};
</script>
