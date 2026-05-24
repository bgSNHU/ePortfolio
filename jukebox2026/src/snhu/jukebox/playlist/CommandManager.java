package snhu.jukebox.playlist;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class CommandManager {
	
	public CommandManager(){
	}
	
	// Method to print the main menu
	void printMainMenu(){
		System.out.println("\n\nWelcome to SNHU Jukebox Playlist Music!");
		System.out.println("Enter Student Playlist Name (Example: TestStudent1_Playlist): ");
		System.out.println("Quit: quit");
		System.out.print("Enter a Command : ");
	}
	
	String getCommand(){
		String command="";
		try{
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			command = br.readLine();
		}
		catch(Exception e){
			System.out.println("Something went wrong with the system input!   Please try again.");
		}
		return command;
	}
	
	String parseCommand(String command){
		String studentPlaylistRequested ="";
		if(command!=null && command.length()>0){
			studentPlaylistRequested = command;
		}
		else{
			System.out.println("Please enter a valid command.");
		}
		return studentPlaylistRequested;
	}
}