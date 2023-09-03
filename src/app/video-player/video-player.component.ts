import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var YT: any; // Declare YT object

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoId: any; // Input property to pass the YouTube video ID

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Load the YouTube Player API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    // Insert the script tag before the first script element on the page
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize the YouTube player when the API script is loaded
    tag.onload = () => {
      this.initYoutubePlayer();
    };
  }

  ngAfterViewInit(): void {
    // Add an event listener to the iframe to prevent navigation
    const iframe = this.elementRef.nativeElement.querySelector('iframe[data-prevent-youtube-navigation]');
    iframe.addEventListener('click', (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      // You can add a message or take other actions here if needed
    });
  }

  initYoutubePlayer(): void {
    // The ID of the container element where the YouTube player will be embedded
    const containerId = 'youtube-player-container';
  
    // Create and configure the YouTube player
    new YT.Player(containerId, {
      videoId: this.videoId,
      playerVars: {
        controls: 1,         // Show player controls
        modestbranding: 1,  // Hide YouTube logo in the control bar
        disablekb: 1,       // Disable keyboard controls (prevents opening YouTube)
        autoplay: 1,
      },
      events: {
        // You can add event handlers here if needed
      }
    });
  }
}
