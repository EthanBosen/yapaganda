import UIKit
import WebKit

class ViewController: UIViewController {

    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Initialize the WKWebView
        webView = WKWebView(frame: self.view.frame)
        self.view.addSubview(webView)

        // Load the HTML content
        loadHTMLContent()
    }

    func loadHTMLContent() {
        // The path to the HTML file in the main bundle
        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "WebContent") {
            do {
                let htmlString = try String(contentsOfFile: htmlPath, encoding: .utf8)

                // Get the base URL for the HTML content
                let baseURL = URL(fileURLWithPath: htmlPath).deletingLastPathComponent()

                // Load the HTML content into the web view
                webView.loadHTMLString(htmlString, baseURL: baseURL)
            } catch {
                print("Failed to load HTML content: \(error.localizedDescription)")
            }
        }
    }
}
