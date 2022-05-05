import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { logout } from "../spotify";

import { NavLink, Link } from "react-router-dom";

const navlinkStyles = {
  textDecoration: "none",
  color: "inherit",
};

const drawerWidth = 240;

export default function Sidebar(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Canned Tunr
            </Typography>
          </Toolbar>
          <Button
            variant="outlined"
            color="inherit"
            onClick={logout}
            sx={{ marginRight: "10px" }}
          >
            Log Out
          </Button>
        </Stack>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <NavLink to="/" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>

          <NavLink to="/discover" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <TravelExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Discover" />
            </ListItem>
          </NavLink>

          <NavLink to="/artists" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <RecordVoiceOverIcon />
              </ListItemIcon>
              <ListItemText primary="Artists" />
            </ListItem>
          </NavLink>

          <NavLink to="/albums" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <LibraryMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Albums" />
            </ListItem>
          </NavLink>

          <NavLink to="/playlists" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <FeaturedPlayListIcon />
              </ListItemIcon>
              <ListItemText primary="Playlists" />
            </ListItem>
          </NavLink>

          <NavLink to="/search" style={navlinkStyles}>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
}
