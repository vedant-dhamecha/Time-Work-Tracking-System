import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  HomeFilled,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AuditOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Avatar } from "antd";
import "../styles/dashboard.css";
import logo from "../assets/logo.png";
import context from "../Context/context";
import Register from "./Register";
import Profile from "./Profile";
import Projects from "./Projects";
import CreateProject from './CreateProject';
import ManageProjects from "./ManageProjects";
import AnalysisProject from "./AnalysisProject";

const { Header, Sider, Content, Footer } = Layout;
const { Meta } = Card;

export default function Dashboard() {
  // const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [sliderItem, setSliderItem] = useState("profile");
  const [registerFor, setRegisterFor] = useState("");
  const person = Cookies.get("person");
  const { setNav, profileImg, projects, projectName, setProjectName, managerProjects, setManagerProjects, } = useContext(context);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setNav(false);
    // console.log(projects);
  }, []);

  return (
    <>
      {/* <div>Dashboard</div> */}
      <Layout>
        <Sider
          trigger={<MenuUnfoldOutlined />}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: "14vh", width: "14.5vh", padding: "2vh" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['profile']}
            items={[
              person === "hr" && {
                key: "1",
                icon: <AuditOutlined />,
                label: "New Registrations",
                children: [
                  {
                    key: "manager",
                    icon: <UserOutlined />,
                    label: "Manager",
                    onClick: () => {
                      setSliderItem("registration");
                      setRegisterFor("manager");
                    },
                  },
                  {
                    key: "employee",
                    icon: <UserOutlined />,
                    label: "Employee",
                    onClick: () => {
                      setSliderItem("registration");
                      setRegisterFor("employee");
                    },
                  },
                ],
              },

              person === "manager" && {
                key: "add project",
                icon: <UserOutlined />,
                label: "Add Project",
                onClick: () => {
                  setSliderItem("add project");
                  // setRegisterFor("project");
                },
              },

              person === "employee" && (
                projects.length > 0
                  ? {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "Projects",
                    children: projects.map((p) => {
                      return {
                        key: p.projectTitle,
                        icon: <UserOutlined />,
                        label: p.projectTitle,
                        onClick: () => {
                          setProjectName(p.projectTitle);
                          setSliderItem("projects");
                        },
                      };
                    }),
                  }
                  :
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "Projects",
                    onClick: () => {
                      setProjectName("not_found");
                      setSliderItem("projects");
                    },
                  }

              ),

              person === "manager" && {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Management",
                children: managerProjects.map((p) => {
                  return {
                    key: p.projectTitle,
                    icon: <UserOutlined />,
                    label: p.projectTitle,
                    onClick: () => {
                      setProjectName(p.projectTitle);
                      setSliderItem("management");
                    },
                  };
                }),
                // onClick: () => {
                //   setSliderItem("management");
                // },
              },
              person === "manager" && {
                key: "work analysis",
                icon: <BarChartOutlined />,
                label: "Work Analysis",

                onClick: () => {
                  setSliderItem("work analysis");
                },
              },
              {
                key: 'profile',
                icon: <UserOutlined />,
                label: "Profile",
                onClick: () => {
                  setSliderItem("profile");
                },
              },
              {
                key: "4",
                icon: <HomeFilled />,
                label: "Home",
                onClick: () => {
                  setNav(true);
                  navigate("/");
                },
              },
            ]}
          />
        </Sider>
        <Layout style={{ marginLeft: 15, marginRight: 15, minHeight: "100vh" }}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Meta
              avatar={<Avatar src={profileImg} />}
            // title={personData.name}
            />
          </Header>

          <Content className="content" style={{ background: colorBgContainer }}>
            <div style={{ padding: 20 }}>
              {sliderItem === "registration" && (
                <Register registerFor={registerFor} />
              )}
            </div>
            {sliderItem === "profile" && <Profile />}
            {sliderItem === "management" && <ManageProjects projectName={projectName} projects={managerProjects} />}
            {sliderItem === "work analysis" && <AnalysisProject />}
            {sliderItem === "projects" && (<Projects projectName={projectName} />)}
            {sliderItem === "add project" && (<CreateProject />)}
          </Content>


          <Footer className="footer">Time & Work Tracking System</Footer>
        </Layout>
      </Layout>
    </>
  );
}
