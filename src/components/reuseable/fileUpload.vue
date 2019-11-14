<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <template v-for="(image,index) in imagesList">
                    <v-col style="position: relative" :key="index" cols="6" sm="3" md="4">
                        <v-img
                            :src="image.temporaryUrl"
                            :lazy-src="template"
                            aspect-ratio="1"
                            max-width="150"
                            max-height="150"
                        >
                            <template>
                                <v-progress-circular
                                    style="position:absolute; top: 0px;right: 0px;"
                                    v-if="image.loading"
                                    indeterminate
                                    :size="15"
                                    :width="2"
                                    color="red"
                                ></v-progress-circular>
                                <v-icon v-else @click="removeImage(image.key,image.files)" style="cursor:pointer; position:absolute; top: 0px;right: 0px;" color="red" small>fas fa-times-circle</v-icon>
                            </template>
                        </v-img>
                        <error-message-component :message-error="image.errorMessage"></error-message-component>
                    </v-col>
                </template>
            </v-row>
        </v-col>
        <v-col>
            <input ref="inputFile" type="file" @change="uploadImages" :multiple="isMultiple" style="display: none;">
            <v-btn color="success" class="mb-2" small @click="openFolder" :disabled="!remainingImageLeft">Upload Gambar {{title}}</v-btn>
            <error-message-component :message-error="errorMessage"></error-message-component>
        </v-col>
    </v-row>
</template>
<script>
import FileUploadsAPI from '@/api/FileUploadsAPI';
import createObjectUrl from '@/helper/createObjectUrl';
import uniqueID from '@/helper/uniqueID';

const errorMessageComponent = () => import('@/components/reuseable/errorMessage');
export default {
    name: 'fileUpload',
    components: {
        errorMessageComponent,
    },
    data: () => ({
        imagesList: [],
        fileUploadsAPI: null,
        template: 'https://via.placeholder.com/150?text=Image Here',
    }),
    props: {
        maxFiles: {
            type: Number,
            default: 1,
        },
        title: {
            type: String,
            default: '',
        },
        acceptedMime: {
            type: Array,
            default: () => [],
        },
        maxSize: {
            type: String,
            default: undefined,
        },
        prefix: {
            type: String,
            required: true,
        },
        errorMessage: {
            type: String,
            default: '',
        },
        value: {
            type: Array,
            default: () => [],
        },
        preDefinedImage: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        isMultiple() {
            return this.maxFiles > 1;
        },
        isImageListsEmpty() {
            return !this.imagesList.length;
        },
        remainingImageLeft() {
            return this.maxFiles - this.imagesList.length;
        },
    },
    watch: {
        preDefinedImage: {
            immediate: true,
            handler(val) {
                if (val.length) this.mapPreDefinedImage();
            },
        },
    },
    created() {
        this.initApi();
    },
    methods: {
        initApi() {
            this.fileUploadsAPI = new FileUploadsAPI();
        },
        setToParent(imageList) {
            this.$emit('input', [...imageList]);
        },
        mapPreDefinedImage() {
            this.imagesList = this.preDefinedImage.map(eachData => ({
                key: uniqueID(),
                loading: false,
                fileObj: null,
                temporaryUrl: eachData.fullUrl,
                errorMessage: '',
                files: eachData.path,
            }));
            this.setToParent(this.imagesList);
        },
        uploadImages(event) {
            const { files } = event.target;
            let startLoop = 0;
            while (startLoop < this.remainingImageLeft) {
                const fileObj = {
                    key: uniqueID(),
                    loading: true,
                    files: '',
                    fileObj: files[startLoop],
                    temporaryUrl: createObjectUrl(files[0]),
                    errorMessage: '',
                };
                this.imagesList.push({ ...fileObj });
                this.sendImageToServer(fileObj);
                startLoop += 1;
            }
            this.resetInputFile();
        },
        async sendImageToServer(filesObj) {
            try {
                const formData = new FormData();
                formData.append('file', filesObj.fileObj);
                const result = await this.fileUploadsAPI.uploadFiles(this.prefix, formData);
                this.imagesList = this.imagesList.map((eachData) => {
                    if (eachData.key && filesObj.key) {
                        return {
                            ...eachData,
                            files: result.data,
                            loading: false,
                            errorMessage: '',
                        };
                    }
                    return {
                        ...eachData,
                    };
                });
            } catch (error) {
                this.$error(
                    error,
                    {
                        badRequest: () => {
                            this.imagesList = this.imagesList.map(eachData => (
                                eachData.key === filesObj.key ? {
                                    ...eachData,
                                    loading: false,
                                    errorMessage: error.response.data.errors.file[0],
                                } : {
                                    ...eachData,
                                }
                            ));
                        },
                        default: () => {
                            console.log('ini error', error);
                        },
                    },
                );
            } finally {
                this.setToParent(this.imagesList);
            }
        },
        async removeImage(key, files) {
            if (files) {
                try {
                    const data = {
                        path: files,
                    };
                    this.fileUploadsAPI.deleteFiles(data);
                } catch (error) {
                    console.log('ini error', error);
                }
            }
            this.imagesList = this.imagesList.filter(eachData => eachData.key !== key);
            this.setToParent(this.imagesList);
        },
        resetInputFile() {
            this.$refs.inputFile.value = '';
        },
        openFolder() {
            this.$refs.inputFile.click();
        },
        reset() {
            this.resetInputFile();
            this.imagesList = [];
            this.setToParent(this.imagesList);
        },
    },
};
</script>
