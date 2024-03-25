import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { formatDate } from "../utils/date";
import { Box, Button, Grid, TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loading from "../utils/Loading";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CenteredSearchBar = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const RightAlignedButton = styled(Button)({
  marginRight: "auto",
});

export default function Home() {
  const [expandedMap, setExpandedMap] = useState({});
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExpandClick = (blogId) => {
    setExpandedMap((prevExpanded) => ({
      ...prevExpanded,
      [blogId]: !prevExpanded[blogId],
    }));
  };

  const CardWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  }));

  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://radar-backend.onrender.com/api/blog/all"
        );
        if (res) {
          setLoading(false);
          setData(res.data.blog);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://radar-backend.onrender.com/api/blog/title?search=${searchQuery}`
      );
      if (res) {
        setData(res.data.blog);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <CenteredSearchBar>
        <TextField
          label="Search Blog Title here.."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: "500px",
            marginTop: "20px",
            marginRight: "10px",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF", // Background color
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "20px",
                borderColor: "#bdbdbd", // Border color
              },
              "&:hover fieldset": {
                borderColor: "#4fa94d", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4fa94d", // Focused border color
              },
            },
          }}
        />
      </CenteredSearchBar>
      <RightAlignedButton
        variant="outlined"
        onClick={handleSort}
        sx={{
          marginLeft: "60px",
          backgroundColor: "#2196f3",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Sort by Date{" "}
        {sortOrder === "asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </RightAlignedButton>
      <Grid container spacing={4} sx={{ width: "95%", margin: "auto" }}>
      {loading ? (
          <Loading />
        ) : data.length === 0 ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "70vh" }}
          >
            <Grid item>
              <Typography variant="h6">
                No blogs found. Start creating your blogs!
              </Typography>
            </Grid>
          </Grid>
        ) : (
          data &&
          data?.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CardWrapper item xs={12}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      item?.author_ID?.image ? (
                        <Avatar src={item?.author_ID?.image} />
                      ) : (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      )
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item?.author_ID?.full_name}
                    subheader={formatDate(item?.createdAt)}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      item?.image
                        ? item?.image
                        : "data:image/jpeg;base64,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"
                    }
                    alt="Paella dish"
                  />

                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      Blog Title : {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Blog Category : {item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blog Category Descriptin : {item.category_desc}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      style={{ color: red[500] }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expandedMap[item._id]}
                      onClick={() => handleExpandClick(item._id)}
                      aria-expanded={expandedMap[item._id]}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedMap[item._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <Typography paragraph>Blog Description:</Typography>
                      <Typography paragraph>{item.desc}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </CardWrapper>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
