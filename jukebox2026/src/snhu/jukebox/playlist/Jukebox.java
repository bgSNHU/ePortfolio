package snhu.jukebox.playlist;

import java.util.LinkedList;
import java.util.Queue;


public class Jukebox {
    
    static Queue<PlayableSong> playlist = new LinkedList<PlayableSong>();
    PlayableSong current;
    
    Jukebox() {
    }

    public Queue<PlayableSong> play(String studentPlaylistRequested) {
    	StudentList studentProfile = new StudentList();
    	Student student = studentProfile.GetStudentProfile(studentPlaylistRequested);
    	
    	playlist = student.getPlaylist();
        current = playlist.poll();
        if(current != null) {
            current.play();
        }
        
        return playlist;
    }
    
    public void playNext() {
        if(current instanceof Song) {
            // If we are currently playing a song, get the next one
            getNextSong();
        } 
    }
    
    public void getNextSong() {
        current = playlist.poll();
        if(current != null) {
            current.play();
        }
    }
}
