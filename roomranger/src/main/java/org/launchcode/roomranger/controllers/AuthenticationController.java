//package org.launchcode.roomranger.controllers;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//import jakarta.validation.Valid;
//import org.launchcode.roomranger.data.ManagerRepository;
//import org.launchcode.roomranger.data.UserRepository;
//import org.launchcode.roomranger.models.*;
//import org.launchcode.roomranger.models.DTO.RegistrationFormDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.Errors;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import java.util.Optional;
//
//@Controller
//    public class AuthenticationController {
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    ManagerRepository managerRepository;
//
//    private static final String userSessionKey = "user";
//
//        public User getUserFromSession(HttpSession session) {
//            Integer userId = (Integer) session.getAttribute(userSessionKey);
//            if (userId == null) {
//                return null;
//            }
//
//            Optional<User> user = userRepository.findById(userId);
//
//            return user.orElse(null);
//
//        }
//
//    public Manager getManagerFromSession(HttpSession session) {
//        Integer ManagerId = (Integer) session.getAttribute(userSessionKey);
//
//        Optional<User> user = userRepository.findById();
//
//        if (user.isEmpty()) {
//            return null;
//        }
//        if (user.get() instanceof ManagerUser) {
//            ManagerUser managerUser = (ManagerUser) user.get();
//            return managerUser.getManager();
//        }
//        return null;
//    }
//}
//
////        public RoomAttendant getRoomAttendantFromSession(HttpSession session) {
////            Integer roomttendantId = (Integer) session.getAttribute(userSessionKey);
////            if (roomttendantId == null) {
////                return null;
////            }
////
////            Optional<User> user = userRepository.findById();
////
////            if (user.isEmpty()) {
////                return null;
////            }
////            if (user.get() instanceof RoomAttendantUser) {
////                RoomAttendantUser childUser = (RoomAttendantUser) user.get();
////                return childUser.getRoomAttendant();
////            }
////            return null;
////        }
////
////
////
////        private static void setUserInSession(HttpSession session, User user) {
////            session.setAttribute(userSessionKey, user.getId());
////        }
////
////        @GetMapping("/register")
////        public String displayRegistrationForm(Model model) {
////            model.addAttribute(new RegistrationFormDTO());
////            model.addAttribute("title", "Register");
////            return "register";
////        }
////
////        @PostMapping("/register")
////        public String processRegistrationForm(@ModelAttribute @Valid RegistrationFormDTO registrationFormDTO, Errors errors, HttpServletRequest request, Model model) {
////
////            if (errors.hasErrors()) {
////                model.addAttribute("title", "Register");
////                return "register";
////            }
////
////            User existingUser = userRepository.findByUsername(RegistrationFormDTO.getUsername());
////
////            if (existingUser != null) {
////                errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
////                model.addAttribute("title", "Register");
////                return "register";
////            }
////
////            String password = RegistrationFormDTO.getPassword();
////            String verifyPassword = RegistrationFormDTO.getVerifyPassword();
////            if (!password.equals(verifyPassword)) {
////                errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
////                model.addAttribute("title", "Register");
////                return "register";
////            }
////
////            ParentUser newParentUser = new ParentUser(registerFormDTO.getUsername(), registerFormDTO.getPassword());
////            userRepository.save(newParentUser);
////            setUserInSession(request.getSession(), newParentUser);
////            Parent newParent = new Parent(registerFormDTO.getFirstName(), registerFormDTO.getLastName(), newParentUser);
////            parentRepository.save(newParent);
////            return "redirect:";
//
//
////        @PostMapping("/login")
////        public String processLoginForm(@ModelAttribute @Valid LoginFormDTO loginFormDTO, Errors errors, HttpServletRequest request, Model model) {
////
////            if (errors.hasErrors()) {
////                model.addAttribute("title", "Log In");
////                return "login";
////            }
////
////            User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
////
////
////            if (theUser == null) {
////                errors.rejectValue("username", "user.invalid", "The given username does not exist");
////                model.addAttribute("title", "Log In");
////                return "login";
////            }
////
////            String password = loginFormDTO.getPassword();
////
////            if (!theUser.isMatchingPassword(password)) {
////                errors.rejectValue("password", "password.invalid", "Invalid password");
////                model.addAttribute("title", "Log In");
////                return "login";
////            }
////
////            if (userRepository.findByUsername(loginFormDTO.getUsername()) instanceof ParentUser) {
////                ParentUser theParentUser = (ParentUser) userRepository.findByUsername(loginFormDTO.getUsername());
////                setUserInSession(request.getSession(), theParentUser);}
////            else if (userRepository.findByUsername(loginFormDTO.getUsername()) instanceof ChildUser)  {
////                ChildUser theChildUser = (ChildUser) userRepository.findByUsername(loginFormDTO.getUsername());
////                setUserInSession(request.getSession(), theChildUser);}
////
////            return "redirect:/dashboard";
////        }
////
////        @GetMapping("/logout")
////        public String logout(HttpServletRequest request){
////            request.getSession().invalidate();
////            return "redirect:/";
////        }
//
//
//
