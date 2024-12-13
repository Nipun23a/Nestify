const University = require('../models/University');

// Create  a new university
exports.createUniversity = async (req,res) => {
  try {
      const {university_name,address,city,state,postal_code,google_map_link,country} = req.body;

      const existingUniversity = await University.findOne({
          university_name:university_name,
          country:country,
          postal_code:postal_code
      });

      if (existingUniversity) {
          return res.status(400).json({
              message: 'University with this name,country and postal code already exist',
              university: existingUniversity
          });
      }

      const university = new University({
          university_name,
          address,
          city:city||null,
          state:state||null,
          postal_code,
          google_map_link,
          country
      });

      const savedUniversity = await university.save();
      return res.status(201).json({
          message: 'University created successfully',
          university: savedUniversity
      });
  }catch (error) {
      res.status(500).json({message:'Error creating university',error:error.message});
  }
};

// Get all university
exports.getAllUniversities = async (req, res) => {
    try{
        const universities = await University.find();
        res.status(1).json({
            message: 'Universities retrieved successfully',
            universities: universities
        });
    }catch (error){
        res.status(500).json({message:'Error retrieving universities',error:error.message});
    }
};

// Get a single university by ID
exports.getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({message: 'No University with this ID'});
        }
        res.status(201).json({
            message: 'University retrieved successfully',
            university: university
        })
    }catch (error) {
        res.status(500).json({
            message: 'Error retrieving university',
            error:error.message
        })
    }
};

// Update a university
exports.updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!university) {
            return res.status(404).json({
                message: 'University not found'
            });
        }

        res.status(200).json({
            message: 'University updated successfully',
            university: university
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating university',
            error: error.message
        });
    }
};

// Delete a university
exports.deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);

        if (!university) {
            return res.status(404).json({
                message: 'University not found'
            });
        }

        res.status(200).json({
            message: 'University deleted successfully',
            university: university
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting university',
            error: error.message
        });
    }
};

