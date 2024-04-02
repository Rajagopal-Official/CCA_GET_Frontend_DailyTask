import { Box, Modal,IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import CloseIcon from "@mui/icons-material/Close";
function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    hospitalType: "",
    numBeds: "",
    emergencyServices: "",
    bloodGroup: "",
    websiteUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSaved, setIsSaved] = useState(false); 
  useEffect(() => {
    if (isSaved) {
      const timeout = setTimeout(() => {
        setIsSaved(false);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [isSaved]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "age" && isNaN(value)) {
      return;
    }
    validateField(name, value);
    if(!errors[name]){
      setTouched({...touched,[name]:true})
    }
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true }); // Mark field as touched
    validateField(name, formData[name]); // Validate the field
  };
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (value.length < 3 || /\d/.test(value)) {
          newErrors.name =
            "Name must be at least 3 characters and contain no numbers.";
        } else {
          delete newErrors.name;
        }
        break;
        case "age":
          if (!/^\d+$/.test(value)) { 
            newErrors.age = "Age must be a number.";
          } else if (value < 18 || value > 60) {
            newErrors.age = "Age must be between 18 and 60.";
          } else {
            delete newErrors.age;
          }
          break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone number must be 10 digits.";
        } else {
          delete newErrors.phone;
        }
        break;
      case "city":
        if (value.length < 3 || /\d/.test(value)) {
          newErrors.city =
            "City must be at least 3 characters and contain no numbers.";
        } else {
          delete newErrors.city;
        }
        break;
      case "state":
        if (value.length < 2 || /\d/.test(value)) {
          newErrors.state =
            "State must be at least 2 characters and contain no numbers.";
        } else {
          delete newErrors.state;
        }
        break;
      case "hospitalType":
        if (value.length < 3 || /\d/.test(value)) {
          newErrors.hospitalType =
            "Hospital type must be at least 3 characters and contain no numbers.";
        } else {
          delete newErrors.hospitalType;
        }
        break;
      case "numBeds":
        if (value < 10 || value > 1000 || isNaN(value)) {
          newErrors.numBeds = "Number of beds must be between 10 and 1000.";
        } else {
          delete newErrors.numBeds;
        }
        break;
      case "emergencyServices":
        if (value.length < 3 || /\d/.test(value)) {
          newErrors.emergencyServices =
            "Emergency services must be at least 3 characters and contain no numbers.";
        } else {
          delete newErrors.emergencyServices;
        }
        break;
      case "bloodGroup":
        const validBloodGroups = [
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-",
        ];
        if (!validBloodGroups.includes(value)) {
          newErrors.bloodGroup =
            "Please enter a valid blood group (A+, A-, B+, B-, AB+, AB-, O+, O-).";
        } else {
          delete newErrors.bloodGroup;
        }
        break;
      case "websiteUrl":
        const urlRegex =
          /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        if (!urlRegex.test(value)) {
          newErrors.websiteUrl = "Please enter a valid website URL.";
        } else {
          delete newErrors.websiteUrl;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    if (!newErrors[fieldName]) {
      setTouched({ ...touched, [fieldName]: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      console.log(formData);
      setIsSaved(true)
      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        hospitalType: "",
        numBeds: "",
        emergencyServices: "",
        bloodGroup: "",
        websiteUrl: "",
      });
      setTouched({});
    }
  };

  const getInputStyle = (fieldName) => {
    const hasError = errors[fieldName];
    const validationPassed = !hasError&&touched[fieldName]
    let borderColor=""
    if (validationPassed) {
      borderColor = "green";
    }
    else if(hasError){
      borderColor="red"
    }
    return {
      width: "100%",
      padding: "5px",
      borderColor: borderColor,
      borderWidth: "2px",
      borderStyle: "solid",
    };
  };

  const getPlaceholderText = (fieldName) => {
    return errors[fieldName] || "";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Hospital Information</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="name"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("name")}
            placeholder={getPlaceholderText("name")}
            required
          />
          {touched.name && !errors.name && formData.name !== ""&& <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute',bottom:'5px',right:'5px' }} />}
        </div>
        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label htmlFor="age" style={{ display: "block", fontWeight: "bold" }}>
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("age")}
            placeholder={getPlaceholderText("age")}
            required
          />
          {touched.age&&!errors.age && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px' }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="email"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("email")}
            placeholder={getPlaceholderText("email")}
            required
          />
          { touched.email&&!errors.email && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="state"
            style={{ display: "block", fontWeight: "bold" }}
          >
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("state")}
            placeholder={getPlaceholderText("state")}
            required
          />
          {touched.state&&!errors.state && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="city"
            style={{ display: "block", fontWeight: "bold" }}
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("city")}
            placeholder={getPlaceholderText("city")}
            required
          />
          {touched.city&&!errors.city && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="hospitalType"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Hospital Type:
          </label>
          <input
            type="text"
            id="hospitalType"
            name="hospitalType"
            value={formData.hospitalType}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("hospitalType")}
            placeholder={getPlaceholderText("hospitalType")}
            required
          />
          {touched.hospitalType&&!errors.hospitalType && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="numBeds"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Number of Beds:
          </label>
          <input
            type="number"
            id="numBeds"
            name="numBeds"
            value={formData.numBeds}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("numBeds")}
            placeholder={getPlaceholderText("numBeds")}
            required
          />
          {touched.numBeds&&!errors.numBeds && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="emergencyServices"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Emergency Services:
          </label>
          <input
            type="text"
            id="emergencyServices"
            name="emergencyServices"
            value={formData.emergencyServices}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("emergencyServices")}
            placeholder={getPlaceholderText("emergencyServices")}
            required
          />
          {touched.emergencyServices&&!errors.emergencyServices && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="bloodGroup"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Blood Group:
          </label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("bloodGroup")}
            placeholder={getPlaceholderText("bloodGroup")}
            required
          />
          {touched.bloodGroup&&!errors.bloodGroup && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>

        <div style={{ marginBottom: "10px", position: 'relative' }}>
          <label
            htmlFor="websiteUrl"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Website URL:
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            style={getInputStyle("websiteUrl")}
            placeholder={getPlaceholderText("websiteUrl")}
            required
          />
          {touched.websiteUrl&&!errors.websiteUrl && <FaCheckCircle style={{ color: 'green', marginLeft: '5px', position: 'absolute', bottom:'5px',right:'5px'  }} />}
        </div>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <Modal
  open={isSaved}
  onClose={() => setIsSaved(false)}
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      width: "200px", 
      height: "75px", 
    }}
  >
    <IconButton
      style={{ position: "absolute", top: "10px", right: "10px" }}
      onClick={() => setIsSaved(false)}
    >
      <CloseIcon/>
    </IconButton>
    <p style={{ textAlign: "center" }}>Form data saved successfully!</p>
  </Box>
</Modal>

    </div>
  );
}

export default App;
