<template>
  <div class="region pb-12 border-b border-solid">
    <div class="mb-5">
      <a-select
        @change="handleCityChange"
        size="large"
        class="w-full"
        defaultValue="default"
      >
        <a-select-option value="default">시/도를 선택해주세요.</a-select-option>
        <a-select-option
          v-for="city in cities"
          :key="city.addressId"
          :value="city.addressId"
        >
          {{ city.addressName }}
        </a-select-option>
      </a-select>
    </div>

    <div class="mb-5">
      <a-select
        @change="handleStateChange"
        size="large"
        class="w-full"
        defaultValue="default"
      >
        <a-select-option value="default"
          >시/군/구를 선택해주세요.</a-select-option
        >
        <a-select-option
          v-for="state in states"
          :key="state.addressId"
          :value="state.addressId"
        >
          {{ state.addressName }}
        </a-select-option>
      </a-select>
    </div>

    <div>
      <a-select
        @change="handleTownshipChange"
        size="large"
        class="w-full"
        defaultValue="default"
      >
        <a-select-option value="default"
          >읍/면/동을 선택해주세요.</a-select-option
        >
        <a-select-option
          v-for="township in townships"
          :key="township.addressId"
          :value="township.addressId"
        >
          {{ township.addressName }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectRegion",
  methods: {
    handleCityChange(value) {
      this.city = value;

      console.log("선택 된 도시: ", this.city);

      this.state_input = "default";
      this.township_input = "default";

      if (this.city !== undefined) {
        this.fetchStateList();
      }
    },
  },
};
</script>
