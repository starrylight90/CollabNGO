import mongoose from 'mongoose';


    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
          },
          email:{
            type: String,
            required: true
          },
          photoUrl: {
            type: String,
            required: true
          },
          password:{
            type: String,
            required:true
          },
          description: {
            type: String,
            required: true
          },
          contactInfo: {
            email: {
              type: String,
              required: true
            },
            phone: {
              type: String,
              required: true
            },
            address: {
              type: String,
              required: true
            }
          },
          socialMediaLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            linkedin: String
          }
    }, { collection: 'CollabNGO' }); // Specify collection name
    


const User = mongoose.model('User', userSchema, 'CollabNGO');

export default User;
