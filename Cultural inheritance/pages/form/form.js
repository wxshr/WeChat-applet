Page({
  data: {
    categories: [
      { id: 1, name: '非物质文化遗产' },
      { id: 2, name: '传统技艺' },
      { id: 3, name: '民俗文化' },
      { id: 4, name: '历史建筑' }
    ],
    formData: {
      title: '',
      categoryIndex: 0,
      description: '',
      images: [],
      contact: ''
    },
    errors: {}
  },

  // 输入标题
  inputTitle(e) {
    this.setData({
      'formData.title': e.detail.value
    });
    this.validateField('title', e.detail.value);
  },

  // 选择分类
  categoryChange(e) {
    this.setData({
      'formData.categoryIndex': e.detail.value
    });
  },

  // 输入描述
  inputDescription(e) {
    this.setData({
      'formData.description': e.detail.value
    });
    this.validateField('description', e.detail.value);
  },

  // 输入联系方式
  inputContact(e) {
    this.setData({
      'formData.contact': e.detail.value
    });
    this.validateField('contact', e.detail.value);
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 3 - this.data.formData.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.images': [...this.data.formData.images, ...res.tempFilePaths]
        });
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.formData.images;
    images.splice(index, 1);
    this.setData({
      'formData.images': images
    });
  },

  // 验证字段
  validateField(field, value) {
    const errors = this.data.errors;
    switch (field) {
      case 'title':
        if (!value) {
          errors.title = '请输入文化遗产名称';
        } else if (value.length < 2) {
          errors.title = '名称至少2个字符';
        } else {
          delete errors.title;
        }
        break;
      case 'description':
        if (!value) {
          errors.description = '请输入详细描述';
        } else if (value.length < 10) {
          errors.description = '描述至少10个字符';
        } else {
          delete errors.description;
        }
        break;
      case 'contact':
        if (!value) {
          errors.contact = '请输入联系方式';
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          errors.contact = '请输入正确的手机号码';
        } else {
          delete errors.contact;
        }
        break;
    }
    this.setData({ errors });
  },

  // 提交表单
  submitForm(e) {
    // 验证所有字段
    this.validateField('title', this.data.formData.title);
    this.validateField('description', this.data.formData.description);
    this.validateField('contact', this.data.formData.contact);

    // 检查是否有错误
    if (Object.keys(this.data.errors).length > 0) {
      wx.showToast({
        title: '请检查表单填写',
        icon: 'none'
      });
      return;
    }

    // 检查图片
    if (this.data.formData.images.length === 0) {
      wx.showToast({
        title: '请至少上传一张图片',
        icon: 'none'
      });
      return;
    }

    // 提交表单
    wx.showLoading({
      title: '提交中...'
    });

    // 模拟提交
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          // 重置表单
          this.setData({
            formData: {
              title: '',
              categoryIndex: 0,
              description: '',
              images: [],
              contact: ''
            },
            errors: {}
          });
        }
      });
    }, 1500);
  }
}); 