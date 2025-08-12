// Company Information Configuration
module.exports = {
  // Company Details
  company: {
    name: 'Tutor Thi Chi Co., Ltd.',
    nameShort: 'Tutor Thi Chi',
    thaiName: 'บริษัท ติวเตอร์ ธี ชี จำกัด',
    website: 'https://tutorthichi.com',
    founded: '2025',
    taxId: '0123456789012',
  },

  // Contact Information
  contact: {
    phone: {
      main: '02-123-4567',
      support: '02-123-4568',
      sales: '02-123-4569',
      fax: '02-123-4570',
    },
    email: {
      info: 'info@tutorthichi.com',
      support: 'support@tutorthichi.com',
      sales: 'sales@tutorthichi.com',
      admin: 'admin@tutorthichi.com',
    },
    social: {
      facebook: 'https://facebook.com/tutorthichi',
      line: 'https://line.me/R/ti/p/@tutorthichi',
      instagram: 'https://instagram.com/tutorthichi',
      youtube: 'https://youtube.com/@tutorthichi',
      tiktok: 'https://tiktok.com/@tutorthichi',
    },
  },

  // Address Information
  address: {
    thai: {
      street: '123 ถนนสุขุมวิท',
      subDistrict: 'แขวงคลองเตย',
      district: 'เขตคลองเตย',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      country: 'ประเทศไทย',
      full: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    },
    english: {
      street: '123 Sukhumvit Road',
      subDistrict: 'Khlong Toei Sub-district',
      district: 'Khlong Toei District',
      province: 'Bangkok',
      postalCode: '10110',
      country: 'Thailand',
      full: '123 Sukhumvit Road, Khlong Toei Sub-district, Khlong Toei District, Bangkok 10110, Thailand',
    },
    building: {
      name: 'Tutor Tower',
      floor: '15',
      room: '1501-1505',
      landmark: 'ใกล้ BTS คลองเตย และ MRT สุขุมวิท',
    },
  },

  // Business Hours
  businessHours: {
    weekdays: {
      open: '08:00',
      close: '20:00',
      days: 'จันทร์-ศุกร์',
    },
    weekend: {
      open: '09:00',
      close: '18:00',
      days: 'เสาร์-อาทิตย์',
    },
    holidays: {
      note: 'ปิดทำการวันหยุดนักขัตฤกษ์',
      exceptions: [
        'เปิดทำการวันหยุดนักขัตฤกษ์บางวัน (กรุณาติดต่อสอบถาม)',
      ],
    },
  },

  // Services
  services: {
    online: {
      name: 'เรียนออนไลน์',
      description: 'เรียนผ่าน Zoom, Google Meet, หรือแพลตฟอร์มอื่นๆ',
      available: true,
    },
    offline: {
      name: 'เรียนตัวต่อตัว',
      description: 'เรียนที่บ้านหรือสถานที่ที่สะดวก',
      available: true,
      areas: [
        'กรุงเทพมหานคร',
        'นนทบุรี',
        'ปทุมธานี',
        'สมุทรปราการ',
        'สมุทรสาคร',
      ],
    },
    hybrid: {
      name: 'เรียนแบบผสมผสาน',
      description: 'สลับระหว่างออนไลน์และตัวต่อตัว',
      available: true,
    },
  },

  // Payment Methods
  payment: {
    methods: [
      'โอนเงินผ่านธนาคาร',
      'บัตรเครดิต/เดบิต',
      'PromptPay',
      'True Money',
      'PayPal (สำหรับลูกค้าต่างชาติ)',
    ],
    banks: [
      {
        name: 'ธนาคารกรุงเทพ',
        accountNumber: '123-4-56789-0',
        accountName: 'บริษัท ติวเตอร์ ธี ชี จำกัด',
      },
      {
        name: 'ธนาคารกสิกรไทย',
        accountNumber: '123-4-56789-1',
        accountName: 'บริษัท ติวเตอร์ ธี ชี จำกัด',
      },
    ],
  },

  // Legal Information
  legal: {
    companyNumber: '0123456789012',
    registeredCapital: '1,000,000 บาท',
    businessType: 'บริษัทจำกัด',
    businessCategory: 'บริการการศึกษา',
    licenseNumber: 'EDU-2025-001',
    insurance: 'ประกันความรับผิดชอบต่อบุคคลที่สาม',
  },
};
