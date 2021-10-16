<template>
  <div class="p-3">
    <h1 class="title has-text-centered">Feistel</h1>

    <div v-for="(round, idx) in rounds" :key="idx" class="block-round">
      <h1 class="subtitle has-text-centered">Round - {{ idx }}</h1>
      <label class="label mt-2">Enter you data</label>
      <div class="control">
        <input v-model="round.userData" class="input" type="text" placeholder="Enter you data" />
      </div>

      <div class="columns">
        <div class="column">
          <button
            :disabled="currentRound !== idx || isGenerateKeyDisabled"
            class="button is-primary is-light"
            @click="generateRandomKey"
          >
            Generate random key
          </button>
          <label class="label mt-2">Random key is</label>
          <div class="control mt-2">
            <input
              v-model="round.randomKey"
              :disabled="currentRound !== idx || isRandomKeyDisabled"
              class="input"
              type="text"
              placeholder="Enter you random key"
            />
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <button
            :disabled="currentRound !== idx || isEncryptDecryptControlsDisabled"
            class="button mt-2 is-primary is-one-fifth"
            @click="encode"
          >
            Encode
          </button>
          <p>Result of encode is {{ round.encodeResult }}</p>
        </div>
        <div class="column">
          <button
            :disabled="currentRound !== idx || isEncryptDecryptControlsDisabled"
            class="button mt-2 is-primary"
            @click="decode"
          >
            {{ decodeMessage }}
          </button>
          <p>Result of decode is {{ round.decodedResult }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateRandomString, getErrorMessage } from '@/utils/utils';
// import * as cryptoApi from '@/services/crypto-api';

export default {
  data: () => ({
    // userInputData: null,
    // randomKey: null,
    // encodeResult: null,
    // decodedResult: null,
    currentRound: 0,
    maxRound: 16,
    rounds: [
      {
        userData: null,
        randomKey: null,
        encodeResult: null,
        decodedResult: null,
      },
    ],
  }),
  computed: {
    isGenerateKeyDisabled() {
      // return !this.userInputData;
      return !this.getCurrentRound.userData;
    },
    isEncryptDecryptControlsDisabled() {
      // return !this.userInputData || !this.randomKey;
      return !this.getCurrentRound.userData || !this.getCurrentRound.randomKey;
    },
    isRandomKeyDisabled() {
      return !this.getCurrentRound.randomKey;
    },
    getCurrentRound() {
      return this.rounds[this.rounds.length - 1];
    },
    decodeMessage() {
      return this.currentRound === 0 ? 'Start round' : 'Next round';
    },
  },
  methods: {
    generateRandomKey() {
      // this.randomKey = generateRandomString(this.userInputData.length);
      this.getCurrentRound.randomKey = generateRandomString(this.getCurrentRound.userData.length);
    },
    async encode() {
      console.log('encode');
      const payload = {
        currentRound: this.currentRound,
        userData: this.getCurrentRound.userData,
        key: this.getCurrentRound.randomKey,
      };

      try {
        const response = Math.random();
        // const response = await cryptoApi.feistelEndpoint('encode', payload);
        console.log('response', response, payload);
        // this.encodeResult = response;
        this.getCurrentRound.encodeResult = response;
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    async decode() {
      console.log('decode');
      this.currentRound += 1;

      this.rounds.push({
        userData: '',
        randomKey: '',
      });
      // MAke a request
      const payload = {
        currentRound: this.currentRound,
        userData: this.getCurrentRound.userData,
        key: this.getCurrentRound.randomKey,
      };

      try {
        const response = Math.random();
        // const response = await cryptoApi.feistelEndpoint('decode', payload);
        console.log('response', response, payload);
        // this.decodedResult = response;
        this.getCurrentRound.decodedResult = response;
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    handleErrorMessage(error) {
      this.$notify({
        group: 'main',
        type: 'error',
        text: error,
      });
    },
  },
};
</script>
