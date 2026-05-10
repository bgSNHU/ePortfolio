package snhu.jukebox.playlist;

import snhu.student.playlists.*;

import java.util.ArrayList;
import java.util.List;

public class StudentList {

	public StudentList(){
	}

	public List<String> getStudentsNames() {
		ArrayList<String> studentNames = new ArrayList<String>();
		
		String StudentName1 = "TestStudent1Name";
		studentNames.add(StudentName1);
		
		String StudentName2 = "TestStudent2Name";
		studentNames.add(StudentName2);
		
		String StudentName3 = "DennishaDerosier";
		studentNames.add(StudentName3);
		/////////////////////////////////////////////////////////////////////////////
		// MODULE 5 CODE ASSIGNMENT                                                //
		// - Use examples above to add your name to the studenNames ArrayList      //
	    // - Add your code BELOW this comment block                                //
		/////////////////////////////////////////////////////////////////////////////
		
		String StudentName4 = "BrandonGuenther";	// Create new student
		studentNames.add(StudentName4);				// Add new student to studentNames array
				
		return studentNames;
	}

	public Student GetStudentProfile(String student){
		Student emptyStudent = null;
	
		switch(student) {
		   case "TestStudent1_Playlist":
			   TestStudent1_Playlist testStudent1Playlist = new TestStudent1_Playlist();
			   Student TestStudent1 = new Student("TestStudent1", testStudent1Playlist.StudentPlaylist());
			   return TestStudent1;
			   
		   case "TestStudent2_Playlist":
			   TestStudent2_Playlist testStudent2Playlist = new TestStudent2_Playlist();
			   Student TestStudent2 = new Student("TestStudent2", testStudent2Playlist.StudentPlaylist());
			   return TestStudent2;
			   
		   case "DennishaDerosier_Playlist":
			   DennishaDerosier_Playlist dennishaDerosierPlaylist = new DennishaDerosier_Playlist();
			   Student DennishaDerosier = new Student("DennishaDerosier", dennishaDerosierPlaylist.StudentPlaylist());
			   return DennishaDerosier;
		
		   /////////////////////////////////////////////////////////////////////////////
		   // MODULE 6 CODE ASSIGNMENT                                                //
		   // - Use examples above to add your own case statement for your profile    //
		   // - Add your code BELOW this comment block                                //
		   /////////////////////////////////////////////////////////////////////////////
			   
		   case "BrandonGuenther_Playlist":
			   BrandonGuenther_Playlist brandonGuentherPlaylist = new BrandonGuenther_Playlist();		//Instantiate BrandonGuenther_Playlist
			   Student BrandonGuenther = new Student("BrandonGuenther", brandonGuentherPlaylist.StudentPlaylist());		//Create Student and assign playlist
			   return BrandonGuenther;		//Return student profile
			      
		}
		return emptyStudent;
	}
}
