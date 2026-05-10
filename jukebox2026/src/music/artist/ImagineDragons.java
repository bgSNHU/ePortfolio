package music.artist;

import java.util.ArrayList;

import snhu.jukebox.playlist.Song;

public class ImagineDragons {

	ArrayList<Song> albumTracks;
    String albumTitle;
    
    public ImagineDragons() {
    }
    
    public ArrayList<Song> getImagineDragonsSongs() {
    	
    	 albumTracks = new ArrayList<Song>();                           //Instantiate the album so we can populate it below
    	 Song track1 = new Song("Believer", "Imagine Dragons");         //Create a song
         Song track2 = new Song("Radioactive", "Imagine Dragons");      //Create another song
         Song track3 = new Song("Demons", "Imagine Dragons");           //Create a third song
         this.albumTracks.add(track1);                                  //Add the first song to song list for Imagine Dragons
         this.albumTracks.add(track2);                                  //Add the second song to song list for Imagine Dragons 
         this.albumTracks.add(track3);                                  //Add the third song to song list for Imagine Dragons 
         return albumTracks;                                            //Return the songs for Imagine Dragons in the form of an ArrayList
    }
}

