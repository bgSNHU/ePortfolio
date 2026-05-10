package snhu.jukebox.playlist;

public class Song extends PlayableSong {

    public Song(String t, String a) {
        this.title = t;
        this.artist = a;
    }
    
    @Override
    void play() {
        System.out.println("Now playing " + this.title + " by " + this.artist + ".");
    }
}