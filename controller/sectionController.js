const Course = require('../models/courses')
const Section = require('../models/sections');
class SectionController {
  // Display the form to add a new watch
  async showSection(req, res, next) {
    try {
      const sections = await Section.find(); // Lấy danh sách các section từ cơ sở dữ liệu
      res.render("home", { sections }); // Render template 'home' với các sections đã lấy được
    } catch (err) {
      next(err); // Xử lý lỗi nếu có
    }
  }
  async addSectionForm(req, res, next) {
    try {
        const sections = await Section.find().populate('course') // Lấy danh sách các section và populate thông tin của course
        const courses = await Course.find(); // Lấy danh sách các course để hiển thị trong dropdown hoặc để bất kỳ mục đích nào khác

        res.render("home", { sections, courses }); // Render 'home' view với 'sections' và 'courses' data
    } catch (err) {
        next(err); // Xử lý lỗi nếu có
    }
}

  async addSection(req, res, next) {
    try {
      const { sectionName, sectionDescription, duration, isMainTask, course } = req.body;
  
      const newSection = new Watch({
        sectionName,
        sectionDescription,
        duration,
        isMainTask: isMainTask === "Yes", // Chuyển đổi giá trị của isMainTask nếu checkbox được chọn
        course,
      });
  
      await newSection.save(); // Lưu newWatch vào cơ sở dữ liệu
      res.redirect("/section"); // Chuyển hướng về trang course sau khi lưu thành công
    } catch (err) {
      console.error(err); // Ghi lỗi ra console
      res.status(500).send("Server Error"); // Gửi phản hồi lỗi 500
    }
  }
  async deleteSection(req, res, next) {
    const { id } = req.params;
  
    try {
        // Tìm và xóa đồng hồ dựa trên id
        const section = await Section.findByIdAndDelete(id);
  
        if (section) {
            // Nếu đồng hồ được tìm thấy và xóa thành công, chuyển hướng về trang danh sách đồng hồ
            return res.redirect('/section');
        } else {
            // Nếu không tìm thấy đồng hồ với id này, chuyển hướng ngược lại hoặc thông báo lỗi
            return res.redirect('/section');
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        next(error);
    }
  }
}
module.exports = new SectionController();
