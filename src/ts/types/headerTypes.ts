const HeaderTypes = [
    // Authentication
    {
        label: "WWW-Authenticate",
        description: "Defines the authentication method that should be used to access a resource.",
        type: "Authentication",
    },
    {
        label: "Authorization",
        description: "Contains the credentials to authenticate a user-agent with a server.",
        type: "Authentication",
    },
    {
        label: "Proxy-Authenticate",
        description:
            "Defines the authentication method that should be used to access a resource behind a proxy server.",
        type: "Authentication",
    },
    {
        label: "Proxy-Authorization",
        description: "Contains the credentials to authenticate a user agent with a proxy server.",
        type: "Authentication",
    },

    { label: "Age", description: "The time, in seconds, that the object has been in a proxy cache.", type: "Caching" },
    {
        label: "Cache-Control",
        description: "Directives for caching mechanisms in both requests and responses.",
        type: "Caching",
    },
    {
        label: "Clear-Site-Data",
        description: "Clears browsing data (e.g. cookies, storage, cache) associated with the requesting website.",
        type: "Caching",
    },
    { label: "Expires", description: "The date/time after which the response is considered stale.", type: "Caching" },
    {
        label: "Pragma",
        description:
            "Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with HTTP/1.0 caches where the Cache-Control header is not yet present.",
        type: "Caching",
    },
    {
        label: "Warning",
        description: "General warning information about possible problems. (Deprecated)",
        type: "Caching",
    },

    // Client hints
    {
        label: "Accept-CH",
        description:
            "Servers can advertise support for Client Hints using the Accept-CH header field or an equivalent HTML <meta> element with http-equiv attribute. (Experimental)",
        type: "Client hints",
    },
    {
        label: "Accept-CH-Lifetime",
        description:
            "Servers can ask the client to remember the set of Client Hints that the server supports for a specified period of time, to enable delivery of Client Hints on subsequent requests to the server's origin. (Experimental, Deprecated)",
        type: "Client hints",
    },
    {
        label: "Critical-CH",
        description:
            "Servers use Critical-CH along with Accept-CH to specify that accepted client hints are also critical client hints. (Experimental)",
        type: "Client hints",
    },

    // User agent client hints
    {
        label: "Sec-CH-Prefers-Reduced-Motion",
        description: "User agent's reduced motion preference setting. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA",
        description: "User agent's branding and version. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Arch",
        description: "User agent's underlying platform architecture. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Bitness",
        description: 'User agent\'s underlying CPU architecture bitness (for example "64" bit). (Experimental)',
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Full-Version",
        description: "User agent's full semantic version string. (Deprecated)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Full-Version-List",
        description: "Full version for each brand in the user agent's brand list. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Mobile",
        description:
            'User agent is running on a mobile device or, more generally, prefers a "mobile" user experience. (Experimental)',
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Model",
        description: "User agent's device model. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Platform",
        description: "User agent's underlying operation system/platform. (Experimental)",
        type: "User agent client hints",
    },
    {
        label: "Sec-CH-UA-Platform-Version",
        description: "User agent's underlying operation system version. (Experimental)",
        type: "User agent client hints",
    },

    //
    {
        label: "Content-DPR",
        description:
            "Response header used to confirm the image device to pixel ratio in requests where the DPR client hint was used to select an image resource. (Deprecated, Experimental)",
        type: " Device client hints",
    },
    {
        label: "Device-Memory",
        description:
            "Approximate amount of available client RAM memory. This is part of the Device Memory API. (Deprecated, Experimental)",
        type: " Device client hints",
    },
    {
        label: "DPR",
        description:
            "Client device pixel ratio (DPR), which is the number of physical device pixels corresponding to every CSS pixel. (Deprecated, Experimental)",
        type: " Device client hints",
    },
    {
        label: "Viewport-Width",
        description:
            "A number that indicates the layout viewport width in CSS pixels. The provided pixel value is a number rounded to the smallest following integer (i.e. ceiling value). (Deprecated, Experimental)",
        type: " Device client hints",
    },
    {
        label: "Width",
        description:
            "A number that indicates the desired resource width in physical pixels (i.e. intrinsic size of an image). (Deprecated, Experimental)",
        type: " Device client hints",
    },

    {
        label: "Downlink",
        description:
            "Approximate bandwidth of the client's connection to the server, in Mbps. This is part of the Network Information API.",
        type: "Network client hints",
    },
    {
        label: "ECT",
        description:
            'The effective connection type ("network profile") that best matches the connection\'s latency and bandwidth. This is part of the Network Information API.',
        type: "Network client hints",
    },
    {
        label: "RTT",
        description:
            "Application layer round trip time (RTT) in milliseconds, which includes the server processing time. This is part of the Network Information API.",
        type: "Network client hints",
    },
    {
        label: "Save-Data",
        description: "A boolean that indicates the user agent's preference for reduced data usage. (Experimental)",
        type: "Network client hints",
    },

    {
        label: "Last-Modified",
        description:
            "The last modification date of the resource, used to compare several versions of the same resource. It is less accurate than ETag, but easier to calculate in some environments. Conditional requests using If-Modified-Since and If-Unmodified-Since use this value to change the behavior of the request.",
        type: "Conditionals",
    },
    {
        label: "ETag",
        description:
            "A unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value to change the behavior of the request.",
        type: "Conditionals",
    },
    {
        label: "If-Match",
        description:
            "Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.",
        type: "Conditionals",
    },
    {
        label: "If-None-Match",
        description:
            "Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags. This is used to update caches (for safe requests), or to prevent uploading a new resource when one already exists.",
        type: "Conditionals",
    },
    {
        label: "If-Modified-Since",
        description:
            "Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.",
        type: "Conditionals",
    },
    {
        label: "If-Unmodified-Since",
        description:
            "Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date. This ensures the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.",
        type: "Conditionals",
    },
    {
        label: "Vary",
        description:
            "Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.",
        type: "Conditionals",
    },

    {
        label: "Connection",
        description: "Controls whether the network connection stays open after the transaction completes.",
        type: "Connection management",
    },
    {
        label: "Keep-Alive",
        description: "Indicates that the connection should be kept open for further messages.",
        type: "Connection management",
    },

    // Content negotiation
    {
        label: "Accept",
        description: "Indicates which media types are acceptable for the response.",
        type: "Connection management",
    },
    {
        label: "Accept-Encoding",
        description: "Indicates which content encodings the client can understand.",
        type: "Connection management",
    },
    {
        label: "Accept-Language",
        description:
            "Indicates which natural languages the client is able to understand, and which locale variant is preferred.",
        type: "Connection management",
    },

    // Controls
    {
        label: "Expect",
        description: "Indicates expectations the client has for behavior of the server.",
        type: "Connection management",
    },
    {
        label: "Max-Forwards",
        description: "Indicates the remaining number of times the message can be forwarded.",
        type: "Connection management",
    },
    {
        label: "Cookie",
        description: "Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.",
        type: "Cookies",
    },
    { label: "Set-Cookie", description: "Sets an HTTP cookie.", type: "Cookies" },

    // CORS
    {
        label: "Access-Control-Allow-Origin",
        description: "Indicates whether the response can be shared with resources with the given origin.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Allow-Credentials",
        description: "Indicates whether the response can be exposed when the credentials flag is true.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Allow-Headers",
        description:
            "Used in response to a preflight request to indicate which HTTP headers can be used when making the request.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Allow-Methods",
        description:
            "Used in response to a preflight request to indicate which HTTP methods can be used when making the request.",
        type: "Cookies",
    },

    {
        label: "Access-Control-Expose-Headers",
        description: "Indicates which headers can be exposed as part of the response by listing their names.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Max-Age",
        description: "Indicates how long the results of a preflight request can be cached.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Request-Headers",
        description:
            "Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.",
        type: "Cookies",
    },
    {
        label: "Access-Control-Request-Method",
        description:
            "Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.",
        type: "Cookies",
    },
    {
        label: "Origin",
        description:
            "Indicates where a fetch originates from. It doesn’t include any path information, but only the server name. It is sent with CORS requests to indicate the origin of the request.",
        type: "Cookies",
    },
    {
        label: "Timing-Allow-Origin",
        description:
            "Allows web servers to declare that they are adhering to a policy of not collecting any user timing data. (Experimental)",
        type: "Cookies",
    },
    {
        label: "Content-Disposition",
        description:
            "Indicates if the content is expected to be displayed inline in the browser, that is, as a Web page or as part of a Web page, or as an attachment, that is downloaded and saved locally.",
        type: "Downloads",
    },

    // Message body information
    {
        label: "Content-Length",
        description: "The length of the response body in octets (8-bit bytes).",
        type: "Downloads",
    },
    { label: "Content-Type", description: "Indicates the media type of the resource.", type: "Downloads" },
    {
        label: "Content-Encoding",
        description:
            "The type of encoding used on the data. Typically used with responses to indicate how the data should be decoded before it can be used by a client.",
        type: "Downloads",
    },
    {
        label: "Content-Language",
        description:
            "Describes the human language(s) intended for the audience, so that it allows a user-agent to format it correctly.",
        type: "Downloads",
    },
    {
        label: "Content-Location",
        description: "Indicates an alternate location for the returned data.",
        type: "Downloads",
    },

    {
        label: "Forwarded",
        description:
            "Contains information from the client-facing side of proxies that is altered or lost when a proxy is involved in the path of the request/response.",
        type: "Proxies",
    },
    {
        label: "X-Forwarded-For",
        description:
            "A de facto standard for identifying the originating IP address of a client connecting to a web server through an HTTP proxy or load balancer.",
        type: "Proxies",
    },
    {
        label: "X-Forwarded-Host",
        description:
            "A de facto standard for identifying the original host requested by the client in the Host HTTP request header, since the host name and/or port of the reverse proxy (load balancer) may differ from the origin server handling the request.",
        type: "Proxies",
    },
    {
        label: "X-Forwarded-Proto",
        description:
            "A de facto standard for identifying the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer.",
        type: "Proxies",
    },
    {
        label: "Via",
        description:
            "A general-header field that is sent by intermediate proxies to indicate that the request has been forwarded to the next proxy in the request chain.",
        type: "Proxies",
    },

    { label: "Location", description: "Indicates the URL to redirect a page to.", type: "Redirects" },
    {
        label: "Refresh",
        description: "Instructs the browser to refresh the current page after a specified number of seconds.",
        type: "Redirects",
    },

    { label: "From", description: "Email address of the user making the request.", type: "Request context" },
    {
        label: "Host",
        description:
            "Specifies the domain name of the server (for virtual hosting), and the TCP port number on which the server is listening.",
        type: "Request context",
    },
    {
        label: "Referer",
        description:
            "Indicates the address of the previous web page from which a link to the currently requested page was followed.",
        type: "Request context",
    },
    {
        label: "Referrer-Policy",
        description: "Controls how much referrer information should be included with requests made.",
        type: "Request context",
    },
    {
        label: "User-Agent",
        description:
            "Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor, or software version of the requesting software user agent.",
        type: "Request context",
    },
    {
        label: "Allow",
        description: "Lists the set of methods supported by the target resource.",
        type: "Response context",
    },
    {
        label: "Server",
        description: "Contains information about the software used by the origin server to handle the request.",
        type: "Response context",
    },
    {
        label: "Accept-Ranges",
        description: "Indicates which range units are supported by the server.",
        type: "Range requests",
    },
    {
        label: "Range",
        description: "Indicates the part of a document that the server should return.",
        type: "Range requests",
    },
    {
        label: "If-Range",
        description: "Makes the request conditional. If the target resource is unchanged, the range header is ignored.",
        type: "Range requests",
    },
    {
        label: "Content-Range",
        description: "Indicates where in a full body message a partial message belongs.",
        type: "Range requests",
    },
    {
        label: "Cross-Origin-Embedder-Policy",
        description: "Allows a resource to enable a cross-origin isolated context. (COEP)",
        type: "Security",
    },
    {
        label: "Cross-Origin-Opener-Policy",
        description:
            "Controls which pages can be treated as the origin of a new browsing context, which allows developers to sandbox potentially untrusted code. (COOP)",
        type: "Security",
    },
    {
        label: "Cross-Origin-Resource-Policy",
        description: "Controls which cross-origin resources may be loaded. (CORP)",
        type: "Security",
    },
    {
        label: "Content-Security-Policy",
        description:
            "Prevents a wide range of attacks, including Cross-Site Scripting (XSS) and other cross-site injections.",
        type: "Security",
    },
    {
        label: "Content-Security-Policy-Report-Only",
        description:
            "Allows web developers to experiment with policies by monitoring (but not enforcing) their effects.",
        type: "Security",
    },
    {
        label: "Expect-CT",
        description: "Allows sites to opt-in to reporting and/or enforcement of Certificate Transparency requirements.",
        type: "Security",
    },
    {
        label: "Feature-Policy",
        description: "Allows developers to selectively enable and disable use of various browser features and APIs.",
        type: "Security",
    },
    {
        label: "Public-Key-Pins",
        description:
            "A security header that tells a web client to associate a specific cryptographic public key with a certain web server to decrease the risk of MITM attacks with forged certificates.",
        type: "Security",
    },
    {
        label: "Public-Key-Pins-Report-Only",
        description: "Allows web developers to experiment with Public Key Pinning.",
        type: "Security",
    },
    {
        label: "Strict-Transport-Security",
        description: "Ensures that a site is always loaded over HTTPS.",
        type: "Security",
    },
    {
        label: "Upgrade-Insecure-Requests",
        description: "Instructs the client to try upgrading to a secure connection (HTTPS) if available.",
        type: "Security",
    },
    { label: "X-Content-Type-Options", description: "Prevents content type sniffing.", type: "Security" },
    {
        label: "X-Download-Options",
        description:
            "Controls whether Internet Explorer should be allowed to open executable files or documents from a website.",
        type: "Security",
    },
    {
        label: "X-Frame-Options",
        description: "Prevents the web page from being displayed in a frame or iframe.",
        type: "Security",
    },
    {
        label: "X-Permitted-Cross-Domain-Policies",
        description: "Restricts the URLs that can appear in a page's <object>, <embed>, and <applet> tags.",
        type: "Security",
    },
    {
        label: "X-XSS-Protection",
        description: "Sets the configuration for the cross-site scripting filter built into most browsers.",
        type: "Security",
    },
];

export default HeaderTypes;
