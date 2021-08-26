package twitch

// create a twitch oauth server flow
func NewOAuthServerFlow(clientID, clientSecret, redirectURL string) *OAuthServerFlow {
	return &OAuthServerFlow{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
	}
}

type OAuthServerFlow struct {
	ClientID     string
	ClientSecret string
	RedirectURL  string
}
