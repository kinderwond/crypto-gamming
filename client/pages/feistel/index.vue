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
    checkIfShowErrorMessage() {
      return this.currentRound === this.maxRound;
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
        this.currentRound += 1;
      }
      this.rounds[idx].hasNextRoundForm = true;
    },
    async encode(roundIdx) {
      if (this.checkIfShowErrorMessage()) {
        this.handleErrorMessage(
          `You have reached the maximum round - ${this.maxRound}. You round is - ${this.currentRound}`
        );
        return;
      }

      const payload = {
        round: roundIdx + 1,
        text: textToBinary(this.rounds[roundIdx].userData),
        key: textToBinary(this.rounds[roundIdx].randomKey),
      };

      this.checkIfNextRoundHasForm(roundIdx);

      try {
        const response = await cryptoApi.feistelEndpoint('encode', payload);
        console.log('encode response', response);
        this.rounds[roundIdx].encodeResult = binaryToChar(response?.result?.text);
        this.rounds[roundIdx].randomKey = binaryToChar(response?.result?.mutatedKey);
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    async decode(roundIdx) {
      if (this.checkIfShowErrorMessage()) {
        this.handleErrorMessage('You have reached the maximum round');
        console.log('max round has been reached');
        return;
      }

      this.checkIfNextRoundHasForm(roundIdx);

      const payload = {
        round: roundIdx + 1,
        text: textToBinary(this.rounds[roundIdx].userData),
        key: textToBinary(this.rounds[roundIdx].randomKey),
      };

      try {
        const response = await cryptoApi.feistelEndpoint('decode', payload);
        console.log('decode response', response);
        this.rounds[roundIdx].decodedResult = binaryToChar(response?.result?.text);
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
