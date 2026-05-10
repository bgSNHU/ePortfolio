package music.artist;

import snhu.jukebox.playlist.Song;
import java.util.ArrayList;

public class MyChemicalRomance {
	
	ArrayList<Song> albumTracks;														//Create ArrayList to store all album tracks
	String albumTitle;
	
	public MyChemicalRomance() {
		}
	
	public ArrayList<Song> getMyChemicalRomanceSongs() {
		
		albumTracks = new ArrayList<Song>();											//Instantiate the album
		Song track1 = new Song("Welcome to the black parade", "My Chemical Romance");	//Create song 1
		Song track2 = new Song("Teenagers", "My Chemical Romance");						//Create song 2
		this.albumTracks.add(track1);													//Add song 1 to song list for My Chemical Romance
		this.albumTracks.add(track2);													//Add song 2 to song list for My Chemical Romance
		return albumTracks;																//Return all songs for My Chemical Romance in ArrayList
	}

}
