const mongoose=require('mongoose')

const grievanceSchema=new mongoose.Schema({
    district: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    supportingDocument: {
      url: {
        type: String,
        default: null
      },
      publicId: {
        type: String,
        default: null
      }
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);


const Grievance = mongoose.model("Grievance",grievanceSchema);


module.exports = Grievance;