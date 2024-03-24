import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const CenteredBox = styled(Box)({
  padding: "25px",
});

function Blog() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    categoryDescription: "",
    blogDescription: "",
    category: "",
    image: "",
  });
  const { ID } = useParams();

  const fetchBlogDetails = async (ID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://radar-backend.onrender.com/api/blog/single/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { title, category_desc, desc, category, image } =
        response.data.blog;
      setFormData({
        blogTitle: title,
        categoryDescription: category_desc,
        blogDescription: desc,
        category,
        image,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    if (ID) {
      fetchBlogDetails(ID);
    }
  }, [ID]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result;
      setSelectedImage(imageUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormData = {
      title: event.target.blogTitle.value,
      category_desc: event.target.categoryDescription.value,
      desc: event.target.blogDescription.value,
      category: event.target.category.value,
      image: selectedImage,
    };

    try {
      const isFormEmpty = Object.entries(newFormData).some(
        ([key, value]) => key !== "image" && (value === "" || value === null)
      );

      if (isFormEmpty) {
        toast.error("Please fill all the details correctly.");
        return;
      }

      const token = localStorage.getItem("token");
      let addBlogData;

      if (ID) {
        setLoading(true);
        addBlogData = await axios.patch(
          `https://radar-backend.onrender.com/api/blog/edit/blog/${ID}`,
          newFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        setLoading(true);
        addBlogData = await axios.post(
          `https://radar-backend.onrender.com/api/blog/add`,
          newFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      setFormData({
        blogTitle: "",
        categoryDescription: "",
        blogDescription: "",
        category: "",
      });
      setSelectedImage(null);
      setLoading(false);
      toast.success(addBlogData.data.msg);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.msg);
      console.error("Error adding/updating blog:", error.response.data.msg);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <CenteredBox>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4">{ID ? "Edit Blog" : "Add Blog"}</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              name="blogTitle"
              label="Blog Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.blogTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <TextField
              name="categoryDescription"
              label="Category Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.categoryDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              name="blogDescription"
              label="Blog Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.blogDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                name="category"
                labelId="category-label"
                label="Category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ fontSize: 40 }}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
                {selectedImage && (
                  <Typography variant="body2" color="textSecondary">
                    {selectedImage.name}
                  </Typography>
                )}
                {!selectedImage && (
                  <Typography variant="body2" color="textSecondary">
                    Upload Image
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  Image size less than 30KB.
                </Typography>
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {loading ? (
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : ID ? (
                "Update Blog"
              ) : (
                "Add Blog"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CenteredBox>
  );
}

export default Blog;
