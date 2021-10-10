<template>
  <div class="p-3">
    <h1 class="title has-text-centered">Hello epta</h1>

    <button class="button is-primary is-light" @click="generateRandomKey">
      Generate random key
    </button>
    <p v-if="randomKey">Random key is {{ randomKey }}</p>
    <label class="label mt-2">Enter you data</label>
    <div class="control">
      <input
        v-model="text"
        class="input"
        type="text"
        placeholder="Enter you data"
      />
    </div>

    <div>
      <button class="button mt-2 is-primary" @click="encode">Encode</button>
      <p>Result of encode is {{ encodedResult }}</p>
      <button class="button mt-2 is-primary" @click="decode">Decode</button>
      <p>Result of decode is {{ decodedResult }}</p>
    </div>

    <div class="buttons mt-5">
      <button class="button is-success" @click="downloadKey">
        Download key
      </button>
      <button class="button is-success" @click="downloadEncryptedData">
        Download encrypted data
      </button>
    </div>
  </div>
</template>

<script>
import * as utils from "../utils/utils";

export default {
  data: function () {
    return {
      text: "",
      randomKey: null,
      encodedResult: null,
      decodedResult: null,
    };
  },
  methods: {
    generateRandomKey() {
      this.randomKey = utils.generateRandomString(this.text.length);
    },
    decode() {
      console.log("decode");
    },
    async encode() {
      const binary = {
        text: utils.textToBinary(this.text),
        key: utils.textToBinary(this.randomKey),
      };
      const res = await this.$axios.$post("http://localhost:3022/encode", {
        ...binary,
      });

      console.log("encode", res);
    },
    downloadKey() {
      this.createBlobFromContentAndDownloadFile(
        this.randomKey,
        "generated-key"
      );
    },
    downloadEncryptedData() {
      this.createBlobFromContentAndDownloadFile(
        this.encodedResult,
        "encoded-data"
      );
    },
    createBlobFromContentAndDownloadFile(content, fileName) {
      const blob = new Blob([content], { type: "text/plain" });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
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
