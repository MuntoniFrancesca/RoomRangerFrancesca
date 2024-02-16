package org.launchcode.roomranger.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;


import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RoomAttendant  extends AbstractEntity{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable=false, updatable=false)
    private int id;

    @NotBlank(message = "First name is required")
    @Column(length = 30)
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    @Column(unique = true, length = 15)
    private String username;
    @Column(unique = true, length = 15)
    private String password;
//    @ManyToOne
//    private Manager manager;
    private String pronoun;
    @Size(max=10)
    private String phoneNumber;
    @OneToMany(mappedBy = "roomAttendant")
    private List<LeaveRequest> leaveList = new ArrayList<>();

//    public void setWorkingDays(String workingDays) {
//        this.workingDays = workingDays;
//    }

//    public String getWorkingDays() {
//        return workingDays;
//    }

//    private String workingDays ;
    @Column(unique = true)
    private String email;
    private String notes;
    private int remainingDays = 20;

    public String getFirstName() {return firstName;}

    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}
    public void setId(int id) {
        this.id = id;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public int getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public String getEmail() {
        return email;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public void setEmail(String email) {
        this.email = email;
    }
//    public Manager getManager() {return manager;}
//
//    public void setManager(Manager manager) {this.manager = manager;}

    public String getPronoun() {return pronoun;}

    public void setPronoun(String pronoun) {this.pronoun = pronoun;}


    public RoomAttendant() {

    }

    public RoomAttendant(int id) {
        this.id = id;
    }

    public RoomAttendant (String firstName, String lastName, String email, String phoneNumber, String username, String password,String notes) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email= email;
        this.phoneNumber= phoneNumber;
//        this.workingDays = workingDays;
        this.username= username;
        this.password=password;
        this.notes=notes;
    }


    public int getRemainingDays() {
        return remainingDays;
    }

    public void setRemainingDays(int remainingDays) {
        this.remainingDays = remainingDays;
    }
}



   
