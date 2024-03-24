import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Paper,
  Badge,
} from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import BlogIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    profileImage: "",
    email: "",
    username: "",
    totalBlogs: "20",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://radar-backend.onrender.com/api/author/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          const { author } = res.data;
          setProfileData({
            profileImage: author.image || "",
            email: author.email || "",
            username: author.full_name || "",
            totalBlogs: "20",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token, loading]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result;
      setProfileData({
        ...profileData,
        profileImage: imageUrl,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.patch(
        "https://radar-backend.onrender.com/api/author/edit/profile",
        {
          email: profileData.email,
          full_name: profileData.username,
          image: profileData.profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        toast.success(res.data.msg);
        setLoading(false);
        setEditMode(false);
      }
    } catch (error) {
      setLoading(false);
      toast.success(error.response.data.msg);
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Box display="flex" justifyContent="center">
              <Avatar
                src={profileData.profileImage}
                sx={{ width: 120, height: 120 }}
              />
            </Box>
            <input
              accept="image/*"
              id="profile-image-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
            <label htmlFor="profile-image-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Image
              </Button>
            </label>
            <Typography variant="caption" color="textSecondary">
              Image size should be less than 30KB.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              sx={{ mb: 2 }}
              disabled={!editMode}
            />
            <TextField
              fullWidth
              label="Author Username"
              variant="outlined"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              sx={{ mb: 2 }}
              disabled={!editMode}
            />
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Badge
                badgeContent={profileData.totalBlogs}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <IconButton disabled>
                  <BlogIcon />
                </IconButton>
              </Badge>
              <Typography variant="body1" sx={{ ml: 2 }}>
                Total Blogs Posted
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              {editMode ? (
                <Button variant="contained" onClick={handleSubmit}>
                  Save Profile
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleEdit}
                  startIcon={<EditIcon />}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={() => navigate("/ownblog")}
                startIcon={<BlogIcon />}
                fullWidth
              >
                See Own Blogs
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
