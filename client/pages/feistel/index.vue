<template>
  <div class="p-3">
    <h1 class="title has-text-centered">Feistel</h1>

    <div v-for="(round, idx) in rounds" :key="idx" class="block-round">
      <h1 class="subtitle has-text-centered">Round - {{ idx + 1 }}</h1>
      <label class="label mt-2">Enter you data</label>
      <div class="control">
        <input v-model="round.userData" class="input" type="text" placeholder="Enter you data" />
      </div>

      <div class="columns">
        <div class="column">
          <button
            :disabled="isGenerateKeyDisabled(idx)"
            class="button is-primary is-light"
            @click="generateRandomKey(idx)"
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
            {{ encodeMessage }}
          </button>
          <p>Result of encode is {{ round.encodeResult }}</p>
        </div>
        <div class="column">
          <button class="button mt-2 is-primary" @click="decode(idx)">
            {{ decodeMessage }}
          </button>
          <p>Result of decode is {{ round.decodedResult }}</p>
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
    currentRound: 1,
    maxRound: 3,
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
    encodeMessage() {
      return this.currentRound === 1 ? 'Start encode round' : 'Next encode round';
    },
    decodeMessage() {
      return this.currentRound === 1 ? 'Start decode round' : 'Next decode round';
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
    generateRandomKey(idx) {
      this.rounds[idx].randomKey = generateRandomString(this.rounds[idx].userData.length);
    },
    checkIfShowErrorMessage(roundIdx) {
      if (roundIdx + 1 !== this.maxRound) return false;
      return this.currentRound === this.maxRound;
    },
    checkIfNextRoundHasForm(idx, isNeedReturn) {
      if (isNeedReturn) return;

      if (!this.rounds[idx].hasNextRoundForm) {
        this.rounds.push({
          userData: null,
          randomKey: null,
          encodeResult: null,
          decodedResult: null,
          hasNextRoundForm: false,
        });
        this.currentRound += 1;
      }
      this.rounds[idx].hasNextRoundForm = true;
    },
    preRequest(roundIdx) {
      let isNeedReturn = false;
      if (this.checkIfShowErrorMessage(roundIdx)) {
        isNeedReturn = true;
        this.handleErrorMessage(
          `You have reached the maximum round - ${this.maxRound}. You round is - ${this.currentRound}`
        );
      }

      this.checkIfNextRoundHasForm(roundIdx, isNeedReturn);
    },
    async encode(roundIdx) {
      this.preRequest(roundIdx);

      const payload = {
        round: roundIdx + 1,
        text: textToBinary(this.rounds[roundIdx].userData),
        key: textToBinary(this.rounds[roundIdx].randomKey),
      };

      try {
        const response = await cryptoApi.feistelEndpoint('encode', payload);
        // we set needed data when we know that there is the next step available
        this.handleResults(roundIdx, 'encodeResult', response);
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    async decode(roundIdx) {
      this.preRequest(roundIdx);

      const payload = {
        round: roundIdx + 1,
        text: textToBinary(this.rounds[roundIdx].userData),
        key: textToBinary(this.rounds[roundIdx].randomKey),
      };

      try {
        const response = await cryptoApi.feistelEndpoint('decode', payload);
        console.log('response decode', response);
        this.handleResults(roundIdx, 'decodedResult', response);
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    handleResults(roundIdx, pattern, response) {
      if (this.rounds[roundIdx + 1]) {
        this.rounds[roundIdx][pattern] = binaryToChar(response?.result?.text);
        this.rounds[roundIdx + 1].randomKey = binaryToChar(response?.result?.mutatedKey);
      } else {
        this.rounds[roundIdx][pattern] = binaryToChar(response?.result?.text);
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
