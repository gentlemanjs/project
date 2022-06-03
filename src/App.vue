<template>
  <div id="app" class="w-1/3 mx-auto font-normal text-sm text-black">
    <Header />
    <!--  TODO: 컴포넌트 분리  -->

    <div class="hero text-center font-semibold">
      <img src="//placeimg.com/640/480/any" alt="이미지" />
      <p class="mt-2 mb-5" style="color: #9686f8">
        강남을 중심으로 열심히 운영하고 있어요.
        <br />
        소중한 의견 받아서 열심히 늘려 나갈게요!
      </p>
    </div>

    <main class="pb-24">
      <div class="region pb-12 border-b border-solid">
        <div class="mb-5">
          <a-select
            @change="handleCityChange"
            size="large"
            class="w-full"
            defaultValue="default"
          >
            <a-select-option value="default"
              >시/도를 선택해주세요.</a-select-option
            >
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

      <div
        @click="switchAdditionalInformation"
        class="switch-additional relative pl-3 border-b border-solid pt-5 pb-5 cursor-pointer"
      >
        <h2 class="font-bold">추가 정보 선택</h2>
        <p class="m-0" style="font-size: 13px">
          추가 정보를 등록해 주시면
          <br />
          최적의 공간을 찾아서 연락 드릴게요!
        </p>
        <div
          class="absolute right-0 mr-3"
          style="top: 50%; transform: translateY(-50%)"
        >
          <a-icon
            v-if="!isVisibleAdditionalInformation"
            type="up"
            class="text-lg"
          />
          <a-icon
            v-if="isVisibleAdditionalInformation"
            type="down"
            class="text-lg"
          />
        </div>
      </div>

      <div v-if="isVisibleAdditionalInformation" class="additional">
        <div class="spatial-structure mb-12">
          <h3 class="mt-10 pl-3 font-bold">
            공간 구조 <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <div class="px-3">
            <ul class="m-0">
              <li
                v-for="house_structure in house_structures"
                :key="house_structure.id"
                @click="handleHouseStructureClick(house_structure.id)"
                class="inline-block mr-2 px-5 py-2 font-medium rounded-full cursor-pointer"
                :class="{
                  'text-white': house_structure_id === house_structure.id,
                }"
                :style="[
                  house_structure_id === house_structure.id
                    ? { backgroundColor: '#c3b9fe' }
                    : { backgroundColor: '#ededed' },
                ]"
              >
                {{ house_structure.description }}
              </li>
            </ul>
          </div>
        </div>

        <div class="square-feet mb-12">
          <h3 class="mt-10 pl-3 font-bold">
            평수 <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <div class="px-3">
            <p
              v-if="square_feet[0] === 1 && square_feet[1] === 40"
              class="text-right"
            >
              전체
            </p>
            <p v-else-if="square_feet[1] === 40" class="text-right">
              {{ this.square_feet[0] }}평 이상
            </p>
            <p v-else-if="square_feet[0] === square_feet[1]" class="text-right">
              {{ this.square_feet[0] }}평
            </p>
            <p v-else class="text-right">
              {{ this.square_feet[0] }}평 ~ {{ this.square_feet[1] }}평
            </p>

            <a-slider
              @change="handleSquareFeetSlider"
              range
              :min="1"
              :max="40"
              :value="square_feet"
            />
          </div>
        </div>

        <div class="monthly-rent mb-12">
          <h3 class="pl-3 font-bold">
            월세 (29박 기준)
            <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <div class="px-3">
            <p
              v-if="monthly_rent[0] === 1 && monthly_rent[1] === 250"
              class="text-right"
            >
              전체
            </p>
            <p v-else-if="monthly_rent[1] === 250" class="text-right">
              {{ this.monthly_rent[0] }}만 이상
            </p>
            <p
              v-else-if="monthly_rent[0] === monthly_rent[1]"
              class="text-right"
            >
              {{ this.monthly_rent[0] }}만
            </p>
            <p v-else class="text-right">
              {{ this.monthly_rent[0] }}만 ~ {{ this.monthly_rent[1] }}만
            </p>

            <a-slider
              @change="handleMonthlyRentSlider"
              range
              :min="1"
              :max="250"
              :value="monthly_rent"
            />
          </div>
        </div>

        <div class="name mb-8">
          <h3 class="pl-3 font-bold">
            이름 <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <a-input v-model="name" style="height: 40px" placeholder="정규직" />
        </div>

        <div class="phone mb-8">
          <h3 class="pl-3 font-bold">
            휴대폰번호 <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <a-input
            v-model="phone"
            style="height: 40px"
            placeholder="010-1234-5678"
          />
        </div>

        <div class="email mb-8">
          <h3 class="pl-3 font-bold">
            이메일 <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <a-input
            v-model="email"
            style="height: 40px"
            placeholder="savara@gmail.com"
          />
        </div>

        <div class="agreement">
          <h3 class="mb-5 pl-3 font-bold">
            개인 정보 수집 및 이용 동의
            <span class="font-medium text-slate-400">(선택)</span>
          </h3>
          <div
            class="mb-5 px-4 py-3 border font-light text-slate-400"
            style="font-size: 13px"
          >
            <p class="m-0">1. 수집 및 이용목적 : 지역 수요 분석, 추가 설문</p>
            <p class="m-0">2. 수집정보 : 이름(성함), 휴대폰번호, 이메일</p>
            <p class="m-0">3. 보유기간 : 제공동의일로부터 1년</p>
          </div>
          <div class="flex pl-3">
            <a-checkbox v-model="checked"> </a-checkbox>
            <p class="ml-2 pb-5 font-medium text-xs text-slate-600">
              (선택) 개인정보 수집 및 이용에 동의합니다. <br />
              (동의한 경우에만 개인 정보가 수집됩니다.)
            </p>
          </div>
        </div>
      </div>

      <div class="submit fixed bottom-0 w-1/3">
        <a-button
          @click="handleSubmit"
          class="w-full mb-10"
          style="height: 40px; background-color: #333; color: #fff"
          >완료</a-button
        >
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";

export default {
  data() {
    return {
      city_input: "default",
      state_input: "default",
      township_input: "default",
      isVisibleAdditionalInformation: false,
      city: undefined,
      cities: [],
      state: undefined,
      states: [],
      township: undefined,
      townships: [],
      house_structure_id: 0,
      house_structures: [],
      square_feet: [1, 40],
      monthly_rent: [1, 250],
      name: "",
      phone: "",
      email: "",
      checked: false,
    };
  },
  components: { Header },
  methods: {
    switchAdditionalInformation() {
      this.isVisibleAdditionalInformation =
        !this.isVisibleAdditionalInformation;
    },
    async fetchCityList() {
      const { data } = await axios.get(
        "https://api-dev.saravayo.com/v1/common/address/city"
      );

      if (data.resultCode === "SN000") this.cities = data.content;
    },
    handleCityChange(value) {
      this.city = value;

      console.log("선택 된 도시: ", this.city);

      this.state_input = "default";
      this.township_input = "default";

      if (this.city !== undefined) {
        this.fetchStateList();
      }
    },
    async fetchStateList() {
      const { data } = await axios.get(
        `https://api-dev.saravayo.com/v1/common/address/children?level=2&pAddressId=${this.city}`
      );

      if (data.resultCode === "SN000") this.states = data.content;
    },
    handleStateChange(value) {
      this.state = value;

      console.log("선택 된 시/군/구: ", this.state);

      if (this.state !== undefined) {
        this.fetchTownshipList();
      }
    },
    async fetchTownshipList() {
      const { data } = await axios.get(
        `https://api-dev.saravayo.com/v1/common/address/children?level=3&pAddressId=${this.state}`
      );

      if (data.resultCode === "SN000") this.townships = data.content;
    },
    handleTownshipChange(value) {
      console.log("선택 된 읍/면/동: ", value);

      this.township = value;
    },
    async fetchHouseStructureList() {
      const { data } = await axios.get(
        "https://api-dev.saravayo.com/v1/common/code/getCodeList?commonCodeType=HOUSE_STRUCTURE"
      );

      console.log("공간 구조: ", data);

      if (data.resultCode === "SN000") this.house_structures = data.content;
    },
    handleHouseStructureClick(id) {
      this.house_structure_id = id;
    },
    handleSquareFeetSlider(value) {
      this.square_feet = value;
    },
    handleMonthlyRentSlider(value) {
      this.monthly_rent = value;
    },
    async handleSubmit() {
      const params = {
        addressId: 3,
        // agreePersonalInfo: true,
        // amountFrom: 500,
        // amountTo: 10000,
        // areaFrom: 10,
        // areaTo: 20,
        houseStructures: [4001, 4002],
        // userEmail: "string",
        // userName: "string",
        // userPhone: "string",
      };

      if (!this.city) return alert("선택 된 시/도가 없습니다.");
      if (!this.state) return alert("선택 된 시/군/구가 없습니다.");
      if (!this.township) return alert("선택 된 읍/면/동이 없습니다.");

      if (this.isVisibleAdditionalInformation && this.checked === false)
        return alert("개인 정보 수집 및 이용 동의에 동의하지 않았습니다.");

      params.agreePersonalInfo = this.checked;
      params.amountFrom = this.monthly_rent[0];
      params.amountTo = this.monthly_rent[1];
      params.areaFrom = this.square_feet[0];
      params.areaFrom = this.square_feet[1];
      params.userEmail = this.email;
      params.userName = this.name;
      params.userPhone = this.phone;

      console.log("Params ", params);

      const { data } = await axios.post(
        "https://api-dev.saravayo.com/v1/common/location/request",
        params
      );

      console.log("완료 버튼", data);
    },
  },
  created() {
    this.fetchCityList();
    this.fetchHouseStructureList();
  },
  updated() {},
};
</script>

<style lang="scss">
@import url("//cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

#app {
  box-sizing: border-box;
  //width: 480px;
  //margin: 0 auto;
  //font-size: 14px;

  div.hero {
    //text-align: center;
    //color: #9686f8;
  }
}
</style>
