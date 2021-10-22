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
            :disabled="isGenerateKeyDisabled(idx)"
            class="button is-primary is-light"
            @click="generateRandomKey"
          >
            Generate random key
          </button>
          <label class="label mt-2">Random key is</label>
          <div class="control mt-2">
            <input
              v-model="round.randomKey"
              :disabled="isRandomKeyDisabled(idx)"
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
            :disabled="isEncryptDecryptControlsDisabled(idx)"
            class="button mt-2 is-primary is-one-fifth"
            @click="encode(idx)"
          >
            Encode
          </button>
          <p>Result of encode is {{ round.encodeResult }}</p>
        </div>
        <div class="column">
          <button
            :disabled="isNextRoundDisabled(idx)"
            class="button mt-2 is-primary"
            @click="decode(idx)"
          >
            {{ decodeMessage }}
          </button>
          <p>Result of decode is {{ round.decodedResult }}</p>
          <p v-if="maxRoundHint" class="has-text-danger">{{ maxRoundHint }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { binaryToChar, generateRandomString, getErrorMessage, textToBinary } from '@/utils/utils';
import * as cryptoApi from '@/services/crypto-api';

export default {
  data: () => ({
    currentRound: 0,
    maxRound: 16,
    rounds: [
      {
        userData: null,
        randomKey: null,
        encodeResult: null,
        decodedResult: null,
        hasNextRoundForm: false,
      },
    ],
  }),
  computed: {
    getCurrentRound() {
      return this.rounds[this.rounds.length - 1];
    },
    decodeMessage() {
      return this.currentRound === 0 ? 'Start round' : 'Next round';
    },
    maxRoundHint() {
      return this.currentRound === this.maxRound ? 'You have reached the maximum round' : '';
    },
  },
  methods: {
    isGenerateKeyDisabled(idx) {
      return !this.rounds[idx].userData;
    },
    isEncryptDecryptControlsDisabled(idx) {
      return !this.rounds[idx].userData || !this.rounds[idx].randomKey;
    },
    isRandomKeyDisabled(idx) {
      return !this.rounds[idx].randomKey;
    },
    isNextRoundDisabled(idx) {
      return this.currentRound === this.maxRound || this.isEncryptDecryptControlsDisabled(idx);
    },
    generateRandomKey() {
      this.getCurrentRound.randomKey = generateRandomString(this.getCurrentRound.userData.length);
    },
    checkIfNextRoundHasForm(idx) {
      if (!this.rounds[idx].hasNextRoundForm) {
        this.rounds.push({
          userData: null,
          randomKey: null,
          encodeResult: null,
          decodedResult: null,
          hasNextRoundForm: false,
        });
      }
      this.rounds[idx].hasNextRoundForm = true;
    },
    async encode(round) {
      console.log('encode round', round);
      const payload = {
        round: this.currentRound + 1,
        text: textToBinary(this.getCurrentRound.userData),
        key: textToBinary(this.getCurrentRound.randomKey),
      };

      try {
        const response = await cryptoApi.feistelEndpoint('encode', payload);
        console.log('encode response', response);
        this.getCurrentRound.encodeResult = binaryToChar(response?.result?.text);

        this.currentRound += 1;
        this.checkIfNextRoundHasForm(round);
        this.rounds[this.currentRound].randomKey = binaryToChar(response?.result?.mutatedKey);
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    async decode(round) {
      console.log('decode round', round);
      const payload = {
        round: this.currentRound + 1,
        text: textToBinary(this.getCurrentRound.userData),
        key: textToBinary(this.getCurrentRound.randomKey),
      };

      try {
        const response = await cryptoApi.feistelEndpoint('decode', payload);
        console.log('decode response', response, payload);
        this.getCurrentRound.decodedResult = binaryToChar(response?.result?.text);

        this.currentRound += 1;
        this.checkIfNextRoundHasForm(round);
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
