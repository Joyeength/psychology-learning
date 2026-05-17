window.MODULES_DEF = [
  { id:1,  name:"Nền tảng",    range:[1,10]   },
  { id:2,  name:"Nhận thức",   range:[11,20]  },
  { id:3,  name:"Trí nhớ",     range:[21,30]  },
  { id:4,  name:"Cảm xúc",     range:[31,40]  },
  { id:5,  name:"Động lực",    range:[41,50]  },
  { id:6,  name:"Xã hội",      range:[51,60]  },
  { id:7,  name:"Nhân cách",   range:[61,70]  },
  { id:8,  name:"Phát triển",  range:[71,80]  },
  { id:9,  name:"Sức khỏe TT", range:[81,90]  },
  { id:10, name:"Ứng dụng",    range:[91,100] },
];

window.TOPICS = {
  1:"Tâm lý học là gì?",2:"Các trường phái TLH",3:"Phương pháp nghiên cứu",4:"Não bộ & tâm lý",5:"Ý thức & vô thức",
  6:"Freud & phân tâm học",7:"Thuyết hành vi",8:"TLH nhân văn",9:"TLH nhận thức",10:"TLH tích cực",
  11:"Cảm giác & tri giác",12:"Ảo giác thị giác",13:"Chú ý & tập trung",14:"Thiên kiến nhận thức",15:"Tư duy phê phán",
  16:"Giải quyết vấn đề",17:"Sáng tạo & insight",18:"Ngôn ngữ & tư duy",19:"Ra quyết định",20:"Dunning-Kruger effect",
  21:"Cách trí nhớ hoạt động",22:"Trí nhớ ngắn & dài hạn",23:"Mã hóa & lưu trữ",24:"Quên – điều cần thiết",25:"Ký ức sai lệch",
  26:"Kỹ thuật ghi nhớ",27:"Cung điện ký ức",28:"Giấc ngủ & trí nhớ",29:"Chấn thương & ký ức",30:"Cải thiện trí nhớ",
  31:"Cảm xúc là gì?",32:"6 cảm xúc cơ bản",33:"Trí tuệ cảm xúc EQ",34:"Điều tiết cảm xúc",35:"Sợ hãi & lo âu",
  36:"Hạnh phúc & tâm lý",37:"Tức giận & quản lý",38:"Đồng cảm & thấu cảm",39:"Cảm xúc xã hội",40:"Tâm lý yêu thương",
  41:"Maslow & tháp nhu cầu",42:"Động lực nội & ngoại",43:"Flow state",44:"Procrastination",45:"Thói quen & ý chí",
  46:"Mục tiêu & thực hiện",47:"Tâm lý thành công",48:"Lý thuyết tự quyết",49:"Fixed vs growth mindset",50:"Kháng cự & thay đổi",
  51:"Ảnh hưởng xã hội",52:"Tuân thủ & phục tùng",53:"Thí nghiệm Milgram",54:"Hiệu ứng đám đông",55:"Định kiến & phân biệt",
  56:"Tình yêu & tình bạn",57:"Xung đột & hòa giải",58:"Lãnh đạo & quyền lực",59:"Thuyết phục & ảnh hưởng",60:"Mạng xã hội & tâm lý",
  61:"Nhân cách là gì?",62:"Big Five (OCEAN)",63:"MBTI – ý nghĩa & hạn chế",64:"Enneagram",65:"Hướng nội vs hướng ngoại",
  66:"Tự ngã & lòng tự trọng",67:"Narcissism",68:"Ranh giới cá nhân",69:"Nhân cách & stress",70:"Thay đổi nhân cách",
  71:"Các giai đoạn phát triển",72:"Piaget & nhận thức trẻ",73:"Attachment theory",74:"Tâm lý tuổi dậy thì",75:"Khủng hoảng bản sắc",
  76:"Tâm lý tuổi 20–30",77:"Khủng hoảng tuổi trung niên",78:"Lão hóa & tâm lý",79:"Trauma & phục hồi",80:"Tâm lý xuyên thế hệ",
  81:"Sức khỏe tâm thần là gì?",82:"Lo âu & rối loạn lo âu",83:"Trầm cảm – hiểu đúng",84:"Stress & burnout",85:"Liệu pháp CBT",
  86:"Mindfulness & thiền",87:"Thể dục & tâm lý",88:"Giấc ngủ & sức khỏe TT",89:"Khi nào tìm chuyên gia",90:"Self-compassion",
  91:"Tâm lý trong công việc",92:"Tâm lý tiêu dùng",93:"Tâm lý giáo dục",94:"Tâm lý giao tiếp",95:"Tâm lý tiền bạc",
  96:"Tâm lý thể thao",97:"Tâm lý pháp lý",98:"Tâm lý môi trường",99:"Tâm lý công nghệ",100:"Hành trình tiếp theo",
};

window.getModBase = function(day) {
  return window.MODULES_DEF.find(function(m) { return day >= m.range[0] && day <= m.range[1]; });
};
