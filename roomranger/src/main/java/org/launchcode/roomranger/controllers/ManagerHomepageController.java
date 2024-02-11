package org.launchcode.roomranger.controllers;

import jakarta.validation.Valid;
import org.launchcode.roomranger.data.AssignedRoomRepository;
import org.launchcode.roomranger.data.RoomAttendantRepository;
import org.launchcode.roomranger.data.RoomRepository;
import org.launchcode.roomranger.exception.NotFoundException;
import org.launchcode.roomranger.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

    @RestController
    @CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
    @RequestMapping("assignedrooms")
    public class ManagerHomepageController {

        @Autowired
        private AssignedRoomRepository assignedRoomRepository;

        @Autowired
        private RoomRepository roomRepository;

        @Autowired
        private RoomAttendantRepository roomAttendantRepository;

        @GetMapping()
        public List<AssignedRoom> getAllAssignedRooms() {
            return (List<AssignedRoom>) assignedRoomRepository.findAll();
        }

//        @GetMapping("/{id}")
//        Optional<AssignedRoom> getAssignedRoomById(@PathVariable Integer id) {
//            return assignedRoomRepository.findById(id);
//        }
//
//        @PutMapping("/{id}")

        @GetMapping("/tasks")
        public Map<String, String> getTasks() {
            Map<String, String> tasks = new HashMap<>();
            for (Task task : Task.values()) {
                tasks.put(task.name(), task.getDisplayName());
            }
            return tasks;
        }

        @GetMapping("/tasks/{id}")
        public String getTask(@PathVariable int id) {
            return assignedRoomRepository.findById(id).get().getTask().getDisplayName();
        }

        @GetMapping("/statuses")
        public Map<String, String> getStatuses() {
            Map<String, String> statuses = new HashMap<>();
            for (Status status : Status.values()) {
                statuses.put(status.name(), status.getDisplayName());
            }
            return statuses;
        }

        @GetMapping("/statuses/{id}")
        public String getStatus(@PathVariable int id) {
            return assignedRoomRepository.findById(id).get().getStatus().getDisplayName();
        }

        @DeleteMapping("assignedroom/{id}")
        public String deleteAssignedRoom(@PathVariable int id) {
            if (!assignedRoomRepository.existsById(id)) {
                throw new NotFoundException("Assignment with id " + id);
            }
            roomRepository.deleteById(id);
            return "Assigned with Id " + id + "has been deleted successfully!";
        }


        @PostMapping(value = "/create")
        public ResponseEntity<AssignedRoom> createAssignedRoom(@RequestBody @Valid AssignedRoom assignedRoom) {
            System.err.println("********************");
            AssignedRoom _assignedRoom = assignedRoomRepository.save(
                    new AssignedRoom(
                            assignedRoom.getRoom(),
                            assignedRoom.getGuest(),
                            assignedRoom.getNumberOfGuests(),
                            assignedRoom.getStatus(),
                            assignedRoom.getCheckIn(),
                            assignedRoom.getCheckOut(),
                            assignedRoom.getTask(),
                            assignedRoom.getNote())
            );
            System.err.println("Assigned Room: " + _assignedRoom.toString());

            return new ResponseEntity<>(_assignedRoom, HttpStatus.CREATED);

        }

        public ResponseEntity<Room> updateRoom(@RequestBody AssignedRoom assignedRoom) {
            System.err.println("********************");

            Room _room = roomRepository.save(assignedRoom.getRoom());
            System.err.println("Room: " + _room.toString());

            return new ResponseEntity<>(_room, HttpStatus.CREATED);

        }
    }