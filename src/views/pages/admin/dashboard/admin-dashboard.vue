<template>
  <layouts></layouts>
  <admin-breadcrumb :title="title" :text="text" :text1="text1"></admin-breadcrumb>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <admin-sidebar></admin-sidebar>
        <!-- /Sidebar -->

        <!-- Student Dashboard -->
        <div class="col-xl-10 col-lg-10">
          <!-- Dashboard Grid -->
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Enrolled Courses</h5>
                  <h2>12</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Active Courses</h5>
                  <h2>03</h2>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 d-flex">
              <div class="card dash-info flex-fill">
                <div class="card-body">
                  <h5>Completed Courses</h5>
                  <h2>13</h2>
                </div>
              </div>
            </div>
          </div>
          <!-- /Dashboard Grid -->

          <div class="dashboard-title">
            <h4>Recently Enrolle Courses</h4>
          </div>
          <div class="row">
            <panel-group @handleSetLineChartData="handleSetLineChartData" />

            <div style="background:#fff;padding:16px 16px 0;margin-bottom:32px; margin-top: 30px">
              <line-chart :chart-data="lineChartData" />
            </div>
          </div>
        </div>
        <!-- Student Dashboard -->
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>
<script>
import AdminHeaderborder from "@/views/layouts/admin-headerborder.vue";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb.vue";
import AdminSidebar from "@/views/layouts/admin-sidebar.vue";
import LineChart from '@/views/pages/admin/component/LineChart.vue'
import PanelGroup from "@/views/pages/admin/component/PanelGroup.vue";
import Layouts from "@/views/layouts/layouts-header.vue";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {Layouts, PanelGroup, LineChart, AdminHeaderborder, AdminBreadcrumb, AdminSidebar},
  data() {
    return {
      title: "Dashboard",
      text: "Home",
      text1: "Dashboard",
      LineChart,
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
};
</script>
