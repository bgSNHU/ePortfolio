package music.artist;

import java.util.ArrayList;

import snhu.jukebox.playlist.Song;

public class Adele {

	ArrayList<Song> albumTracks;
    String albumTitle;
    
    public Adele() {
    }
    
    public ArrayList<Song> getAdelesSongs() {
    	
    	 albumTracks = new ArrayList<Song>();                           //Instantiate the album so we can populate it below
    	 Song track1 = new Song("Hello", "Adele");         				//Create a song
         Song track2 = new Song("Rolling in the Deep", "Adele");        //Create another song
         Song track3 = new Song("Set Fire to the Rain", "Adele");       //Create a third song
         this.albumTracks.add(track1);                                  //Add the first song to song list
         this.albumTracks.add(track2);                                  //Add the second song to song list
         this.albumTracks.add(track3);                                  //Add the third song to song list
         return albumTracks;                                            //Return the songs for Adele in the form of an ArrayList
    }
}