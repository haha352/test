const Course = require('../models/courses')

class courseController{
    async showCourse(req, res, next) {
        try {
            const courses = await Course.find();
            if (!courses) {
                return res.status(404).json({ msg: 'No courses found' });
            }
            res.json({ courses });
        } catch (err) {
            next(err); // Chuyển lỗi tới middleware xử lý lỗi tiếp theo
        }
    }
    async createCourse(req, res, next) {
        const { courseName, courseDescription } = req.body;
        const newCourse = new Course({ courseName, courseDescription });
    
        newCourse.save()
            .then(course => res.status(201).json({ message: 'Course created successfully', course }))
            .catch(err => {
                console.error('Error creating course:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
    async updateCourse(req, res, next) {
        const { id } = req.params;
        const { courseName, courseDescription } = req.body;

        Course.findByIdAndUpdate(id, { courseName, courseDescription }, { new: true })
            .then(updatedCourse => {
                if (!updatedCourse) {
                    return res.status(404).json({ msg: 'Course not found' });
                }
                res.json({ message: 'Course updated successfully', updatedCourse });
            })
            .catch(err => {
                console.error('Error updating course:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
    async deleteCourse(req, res, next) {
        const { id } = req.params;

        try {
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ msg: 'Course not found' });
            }
            res.json({ message: 'Course deleted successfully' });
        } catch (err) {
            console.error('Error deleting course:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
module.exports = new courseController();
