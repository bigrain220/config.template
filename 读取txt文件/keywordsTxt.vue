<template>
  <el-upload action="/" ref="upload" accept=".txt" :before-upload="beforeUpload"  :multiple="false" 
     :on-change="addhandlefileChange">
    <el-button type="primary" size="small" class="txt-btn">txt导入</el-button>
  </el-upload>
</template>

<script>
export default {
  name: "keywordsTxt",
  props: { indexData: { type: Number } },
  data() {
    return {
      textData: ""
    };
  },
  methods: {
    beforeUpload(file) {
      // 读取数据
      this.read(file);
      return false;
    },
    read(f) {
      let rd = new FileReader();
      rd.onload = e => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let cont = rd.reading({
          encode: "GBK"
        });
        // console.log(cont);
        this.textData = cont.split(/\r\n|[\r\n]/);
        console.log(this.textData, this.indexData);
        this.$emit("getTxt", this.textData, this.indexData);
      };
      rd.readAsBinaryString(f);
    },
    addhandlefileChange(file, fileList) {
      //   console.log("change", file);
      const isTxt = file.raw.type === "text/plain";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isTxt) {
        this.$message.error("只能上传.txt格式的文件！");
        this.$refs.upload.clearFiles();
        return false;
      } else if (!isLt2M) {
        this.$message.error("上传文件大小不能超过1MB");
        this.$refs.upload.clearFiles();
        return false;
      } else {
        this.$message.success("导入成功！");
      }
    }
  },
  beforeCreate() {
    // 读取文件
    FileReader.prototype.reading = function({ encode } = pms) {
      let bytes = new Uint8Array(this.result); //无符号整型数组
      let text = new TextDecoder(encode || "UTF-8").decode(bytes);
      return text;
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function(f) {
      if (!this.onload)
        //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = e => {
          //在this.onload函数中，完成公共处理
          let rs = this.reading();
        };
      this.readAsArrayBuffer(f); //内部会回调this.onload方法
    };
  }
};
</script>

<style>
</style>