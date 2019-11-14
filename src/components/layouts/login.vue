/* eslint-disable import/no-cycle */
<template>
    <v-content>
      <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email"
                      name="login"
                      prepend-icon="fas fa-envelope"
                      type="text"
                      v-model="login.email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="fas fa-lock"
                      type="password"
                      v-model="login.password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" @click="startLogin()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
      </v-container>
    </v-content>
</template>
<script>
import CredentialsAPI from '@/api/CredentialsAPI';

export default {
    name: 'login',
    data: () => ({
        credentialsAPI: null,
        login: {
            email: '',
            password: '',
        },
    }),
    created() {
        this.initApi();
    },
    methods: {
        initApi() {
            this.credentialsAPI = new CredentialsAPI();
        },
        async startLogin() {
            try {
                const result = await this.credentialsAPI.userLogin(this.login);
                this.setToken(result.data);
                this.pushToHome();
            } catch (error) {
                console.log('ini error', error);
            }
        },
        setToken(token) {
            localStorage.setItem('token', `${token.token_type} ${token.access_token}`);
        },
        pushToHome() {
            window.location.href = '/';
        },
    },
};
</script>
