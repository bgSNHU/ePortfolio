package snhu.jukebox.playlist;

import java.util.LinkedList;
import java.util.Queue;

public class JukeboxPlayer {
         
    public static void main(String[] args) {
        
    	try{
    		String studentPlaylistRequested ="";                                //create variable for student entered playlist name
    	    Queue<PlayableSong> playlist = new LinkedList<PlayableSong>();		//creating variable to hold the song list queue
    		Jukebox jukebox = new Jukebox();          							//instantiate Jukebox object
			CommandManager cm=new CommandManager();   							//instantiate command line handler
			
			//while loop allows program to continuously ask for input from students on playlists until user specifically types quit
			while(true){
				cm.printMainMenu();                                     		//Displays the menu options in console
				String command = cm.getCommand();                       		//Runs method to retrieve input from user
				if(command.toLowerCase().equals("quit"))                		//If user has typed quit, this if statement proceeds
					break;                                              		//When quit is typed by user it breaks the loop and ends the program
				studentPlaylistRequested = cm.parseCommand(command);    		//Runs parseCommand method in CommandManager to retrieve input from user on playlist name
			
    		
				playlist = jukebox.play(studentPlaylistRequested);              //Now that we have the playlist name, we ask the Jukebox to play/list the songs
				int playlistSize = playlist.size();								//Determine the amount of songs in the playlist
				for (int i = 0; i < playlistSize; i++) {		                //Play the amount of songs that are in the playlist
					jukebox.playNext();                                     	//The jukebox will now play the next song on the list
				}
			}
    	}catch(Exception e){
			System.out.println("Oops!! Something went wrong. Please try again!!");
			//e.printStackTrace();
		}  
    }
}