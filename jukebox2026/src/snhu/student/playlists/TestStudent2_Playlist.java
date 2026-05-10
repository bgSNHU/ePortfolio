package snhu.student.playlists;

import snhu.jukebox.playlist.PlayableSong;
import snhu.jukebox.playlist.Song;
import music.artist.*;
import java.util.ArrayList;
import java.util.LinkedList;

public class TestStudent2_Playlist {
    
	public LinkedList<PlayableSong> StudentPlaylist(){
	
	LinkedList<PlayableSong> playlist = new LinkedList<PlayableSong>();
	ArrayList<Song> adeleTracks = new ArrayList<Song>();
    Adele adele = new Adele();
	
    adeleTracks = adele.getAdelesSongs();
	
	playlist.add(adeleTracks.get(0));
	playlist.add(adeleTracks.get(1));
	playlist.add(adeleTracks.get(2));
	
	
    return playlist;
	}
}