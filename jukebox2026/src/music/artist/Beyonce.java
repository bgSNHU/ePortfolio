package music.artist;

import snhu.jukebox.playlist.Song;
import java.util.ArrayList;

public class Beyonce {
	
	ArrayList<Song> albumTracks;
    String albumTitle;
    
    public Beyonce() {
    }
    
    public ArrayList<Song> getBeyonceSongs() {
    	
    	 albumTracks = new ArrayList<Song>();                                   //Instantiate the album so we can populate it below
    	 Song track1 = new Song("Single Ladies", "Beyonce");             //Create a song
         Song track2 = new Song("Crazy In Love", "Beyonce");         //Create another song
         this.albumTracks.add(track1);                                          //Add the first song to song list for the Beatles
         this.albumTracks.add(track2);                                          //Add the second song to song list for the Beatles 
         return albumTracks;                                                    //Return the songs for the Beatles in the form of an ArrayList
    }
}
