import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/header/Header.jsx';
import HeroSection from './components/herosection/HeroSection.jsx';
import CollaborationSection from './components/collaboration/CollaborationSection.jsx';
import FeaturedCourses from './components/feature_courses/FeaturedCourses.jsx';
import VoiceOfSuccess from './components/voiceofsuccess/VoiceOfSuccess.jsx';
// import FeaturedPrograms from './components/feature_program/FeaturedPrograms.jsx';
import MeetOurInstructors from './components/meet_instructor/MeetOurInstructors.jsx';
import FAQAccordion from './components/faq/FAQAccordion.jsx';
import JoinNow from './components/last_comp/JoinNow.jsx';
import Courses from './components/courses/Courses.jsx';
import FloatingContactButton from './components/FloatingContactButton/FloatingContactButton.jsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import SignupOtp from './components/verifysignupotp/SignupOtp.jsx'
import StudentLoginOtp from './components/verify_student_login/VerifyLogin.jsx'
import VerifyForgotPass from './components/verify_forgot_password/VerifyForgotPass.jsx'
import ResetPassword from './components/reset-password/ResetPassword.jsx'
import StudentSignup from './components/student_signup/StudentSignup.jsx'
import Contact from './components/contact_page/contact.jsx';
import About from './components/about_page/About.jsx';

//admin signup
import AdminSignup from './components/admin_signup/AdminSignup.jsx';
import SignupOtpVerification from './components/admin_signup_otp/SignupOtpVerification.jsx';
import AdminLogin from './components/admin_login/AdminLogin.jsx';
import VerifyLoginAdmin from './components/admin_login_otp/VerifyLoginAdmin.jsx';
import AdminDashboard from './components/admin_dasboard/AdminDashboard.jsx';
import Trainer from './components/admin_dasboard/sub_components/Trainer.jsx';
import StudentList from './components/admin_dasboard/sub_components/StudentList.jsx';
import StudentSearch from './components/admin_dasboard/sub_components/StudentSearch.jsx';
import TrainerSearch from './components/admin_dasboard/sub_components/TrainerSearch.jsx';
import Settings from './components/admin_dasboard/sub_components/Settings.jsx';
import CourseManagement from './components/admin_dasboard/sub_components/CourseManagement.jsx';
import Payment from './components/admin_dasboard/sub_components/Payment.jsx';
import ExamManagement from './components/admin_dasboard/sub_components/ExamManagement.jsx';
import EditInfo from './components/admin_dasboard/sub_components/EditInfo.jsx';

// curriculum information import
import AIMSyllabus from './components/curriculum_info/aiCurriculum.jsx';
import DataAnalyticsSyllabus from './components/curriculum_info/dataAnalyticsCurriculum.jsx';
import DataScienceSyllabus from './components/curriculum_info/dataScienceCurriculum.jsx';
import MernStackSyllabus from './components/curriculum_info/mernStackCurriculum.jsx';
import DevOpsSyllabus from './components/curriculum_info/devOPsCurriculum.jsx';
import QASyllabus from './components/curriculum_info/qACurriculum.jsx';

//Student profile
import Profile from './components/profile/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CourseDetail from './components/enrollCourses/Mern.jsx';
import TrainerSignup from './components/trainer_signup/TrainerSignup.jsx';
import TrainerVerify from './components/trainer_signup_verify/TrainerVerify.jsx';
import TrainerLogin from './components/trainer_login/TrainerLogin.jsx';
import TrainerLoginVerify from './components/trainer_login_verify/TrainerLoginVerify.jsx';
import TrainerProtectedRoute from './TrainerProtectedRoute.jsx';
import TrainerNavbar from './components/trainer_navbar/TrainerNavbar.jsx';
import TrainerDashboard from './components/trainer_dashboard/TrainerDashboard.jsx';
import CreateCourse from './components/trainer_create_course/CreateCourse.jsx';
import CourseDetailsPage from './components/trainer_course_page/CourseDetailsPage.jsx';
import CourseVideosPage from './components/trainer_course_video/CourseVideosPage.jsx';
import EnrolledStudentsPage from './components/trainer_course_students/EnrolledStudentsPage.jsx';
import WhyNeuroNest from './components/why_neuronest/WhyNeuroNest.jsx';
import AllCourses from './components/courses_all/AllCourses.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/auth/a2/login" element={<>
        <Navbar />
        <Login />
        <Footer />
        </>} />
        {/*verify student Login route */}
        <Route path="/auth/a2/verifylogin" element={<>
        <StudentLoginOtp />
        <Footer />
        </>} />

        {/* Signup route */}
        <Route path="/auth/a2/signup" element={<>
        <Navbar />
        <Signup />
        <Footer />
        </>} />
        {/* Signup route */}
        <Route path="/signup/student" element={<>
        <Navbar />
        <StudentSignup />
        <Footer />
        </>} />

        <Route path="/contact" element={<>
        <Navbar />
        <Contact />
        <Footer />
        </>} />

        <Route path="/about" element={<>
        <Navbar />
        <About />
        <Footer />
        </>} />

        {/*student profile route */}
        {/* <Route path="/auth/a2/profile" element={<>
        <Navbar />
        <StudentProfile />
        <Footer />
        </>} /> */}

        {/* verify signup  */}
        <Route path="/auth/a2/verify-signup" element={<>
        {/* <Navbar /> */}
        <SignupOtp />
        <Footer />
        </>} />

        {/* Forgot password route */}
        <Route path="/auth/a2/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/a2/verify-forgotpass" element={<VerifyForgotPass />} />
        <Route path="/auth/a2/reset-pass" element={<ResetPassword />} />


        {/* Admin routes */}
        <Route path="/signup/admin" element={<>
        <Navbar />
        <AdminSignup />
        <Footer />
        </>} />

        <Route path="/admin-otp-verification" element={<>
        <Navbar />
        <SignupOtpVerification />
        <Footer />
        </>} />

        <Route path="/admin-login" element={<>
        <Navbar />
        <AdminLogin />
        <Footer />
        </>} />

        <Route path="/admin-login-verify" element={<>
        <Navbar />
        <VerifyLoginAdmin />
        <Footer />
        </>} />

        <Route path="/admin-dashboard" element={<>
        <Navbar />
        <AdminDashboard />
        <Footer />
        </>} >
        <Route path="trainer" element={<Trainer />} />
          <Route path="student" element={<StudentList />} />
          <Route path="students" element={<StudentSearch />} />
          <Route path="trainers" element={<TrainerSearch />} />
          <Route path="settings" element={<Settings />} />
          <Route path="course" element={<CourseManagement />} />
          <Route path="payment" element={<Payment />} />
          <Route path="exam" element={<ExamManagement />} />
          <Route path="edit-info" element={<EditInfo />} />
        </Route>

        {/* Main front page */}
        <Route 
          path="/" 
          element={
            <>
              {/* <Header /> */}
              <Navbar />
              <HeroSection />
              <FloatingContactButton />
              <ChatBot />
              <CollaborationSection />
              <Courses />
              <VoiceOfSuccess />
              {/* <FeaturedPrograms /> */}
              {/* <FeaturedCourses /> */}
              <WhyNeuroNest />
              <MeetOurInstructors />
              <FAQAccordion />
              <JoinNow />
              <Footer />
            </>
          } 
        />

        {/* all courses */}
        <Route path='/all-courses' element={<>
        <Navbar />
        <AllCourses />
        <Footer />
        </>} />

        {/* Enroll Courses  */}
        <Route path='/courses/:courseId' element={<>
        <ProtectedRoute>
        <Navbar />
        <CourseDetail />
        {/* <Specialization /> */}
        <Footer />
        </ProtectedRoute>
        </>} />

        

        {/* Trainer */}
        <Route path='/signup/trainer' element={<>
        <TrainerSignup />
        <Footer />
        </>} />

        <Route path="/auth/trainer/verify" element={<TrainerVerify />} />


        <Route path='/auth/trainer/login' element={<>
        <Navbar />
        <TrainerLogin />
        <Footer />
        </>} />

        <Route path='/auth/trainer/login/verify' element={<TrainerLoginVerify />} />

        {/* /trainer/dashboard */}
        <Route path='/trainer/dashboard' element={<>
        <TrainerProtectedRoute>
          <TrainerNavbar />
          <TrainerDashboard />
          <Footer />
        </TrainerProtectedRoute>
        </>} />
        <Route path='/create/course' element={<>
        <TrainerProtectedRoute>
          <TrainerNavbar />
          <CreateCourse />
          <Footer />
        </TrainerProtectedRoute>
        </>} />
        <Route path='/trainer/course/:courseId' element={<>
        <TrainerProtectedRoute>
          <TrainerNavbar />
          <CourseDetailsPage />
          <Footer />
        </TrainerProtectedRoute>
        </>} />

        <Route path='/trainer/videos/:courseId' element={<>
        <TrainerProtectedRoute>
          <TrainerNavbar />
          <CourseVideosPage />
          <Footer />
        </TrainerProtectedRoute>
        </>} />

        <Route path='/trainer/students/:courseId' element={<>
        <TrainerProtectedRoute>
          <TrainerNavbar />
          <EnrolledStudentsPage />
          <Footer />
        </TrainerProtectedRoute>
        </>} />


          {/* course detailed cirriculum */}

          <Route path='/curriculum-ai-ml' element={<>
        <Navbar />
        <AIMSyllabus />
        <Footer />
        </>} />
          <Route path='/curriculum-data-analytics' element={<>
        <Navbar />
        <DataAnalyticsSyllabus />
        <Footer />
        </>} />
          <Route path='/curriculum-data-science' element={<>
        <Navbar />
        <DataScienceSyllabus />
        <Footer />
        </>} />
          <Route path='/curriculum-mern-stack' element={<>
        <Navbar />
        <MernStackSyllabus />
        <Footer />
        </>} />
          <Route path='/curriculum-devops' element={<>
        <Navbar />
        <DevOpsSyllabus />
        <Footer />
        </>} />
          <Route path='/curriculum-qa' element={<>
        <Navbar />
        <QASyllabus />
        <Footer />
        </>} />

        {/* profile page */}

<Route path='/profile' element={<>
        <ProtectedRoute >
        <Navbar />
        <Profile />
        <Footer />
        </ProtectedRoute>
        </>} />

        {/* Error Page  */}
        <Route path='*' element={<>
          <Navbar />
          <ErrorPage />
          <Footer />
          </>} />
      </Routes>
    </Router>
  );
}

export default App;