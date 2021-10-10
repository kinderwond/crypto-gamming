<template>
  <div class="p-3">
    <h1 class="title has-text-centered">Welcome to the application!</h1>

    <label class="label mt-2">Enter you data</label>
    <div class="control">
      <input v-model="userInputData" class="input" type="text" placeholder="Enter you data" />
    </div>

    <div class="columns">
      <div class="column">
        <button
          :disabled="isGenerateKeyDisabled"
          class="button is-primary is-light"
          @click="generateRandomKey"
        >
          Generate random key
        </button>
        <label class="label mt-2">Random key is</label>
        <div class="control mt-2">
          <input
            v-model="randomKey"
            :disabled="isDownloadKeyDisabled"
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
          :disabled="isEncryptDecryptControlsDisabled"
          class="button mt-2 is-primary is-one-fifth"
          @click="encode"
        >
          Encode
        </button>
        <p>Result of encode is {{ encodedResultToChar }}</p>
      </div>
      <div class="column">
        <button
          :disabled="isEncryptDecryptControlsDisabled"
          class="button mt-2 is-primary"
          @click="decode"
        >
          Decode
        </button>
        <p>Result of decode is {{ decodedResult }}</p>
      </div>
    </div>

    <h1 class="subtitle has-text-centered has-text-warning-dark">{{ encodedWarning }}</h1>

    <div class="buttons mt-5">
      <button :disabled="isDownloadKeyDisabled" class="button is-success" @click="downloadKey">
        Download key
      </button>
      <button
        :disabled="isDownloadEncryptedDataDisabled"
        class="button is-success"
        @click="downloadEncryptedData"
      >
        Download encrypted data
      </button>
    </div>
  </div>
</template>

<script>
import { generateRandomString, textToBinary, binaryToChar, getErrorMessage } from '@/utils/utils';
import * as cryptoApi from '@/services/crypto-api';

export default {
  data: function() {
    return {
      userInputData: null,
      randomKey: null,
      encodedResult: null,
      decodedResult: null,
    };
  },
  computed: {
    isGenerateKeyDisabled() {
      return !this.userInputData;
    },
    isEncryptDecryptControlsDisabled() {
      return !this.userInputData || !this.randomKey;
    },
    isDownloadKeyDisabled() {
      return !this.randomKey;
    },
    isDownloadEncryptedDataDisabled() {
      return !this.encodedResult;
    },
    encodedResultToChar() {
      return binaryToChar(this.encodedResult);
    },
    encodedWarning() {
      return `Warning: In the output string, there are ASCII characters that are not printable. Use another output type to view the complete output`;
    },
  },
  methods: {
    generateRandomKey() {
      this.randomKey = generateRandomString(this.userInputData.length);
    },
    async encode() {
      const payload = {
        text: textToBinary(this.userInputData),
        key: textToBinary(this.randomKey),
      };

      try {
        const response = await cryptoApi.transcodeApiEndpoint(payload);
        this.encodedResult = response?.transcodedResult;
      } catch (e) {
        console.log('e', e);
        this.handleErrorMessage(getErrorMessage(e));
      }
    },
    async decode() {
      const payload = {
        text: this.encodedResult,
        key: textToBinary(this.randomKey),
      };

      try {
        const response = await cryptoApi.transcodeApiEndpoint(payload);
        this.decodedResult = binaryToChar(response?.transcodedResult);
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
    downloadKey() {
      this.createBlobFromContentAndDownloadFile(this.randomKey, 'generated-key');
    },
    downloadEncryptedData() {
      this.createBlobFromContentAndDownloadFile(this.encodedResultToChar, 'encoded-data');
    },
    createBlobFromContentAndDownloadFile(content, fileName) {
      const blob = new Blob([content], { type: 'text/plain' });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(fileUrl);
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="scss">
.columns {
  &:not(:last-child) {
    margin-bottom: 0;
  }
  margin-top: 0;
}
</style>
