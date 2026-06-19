package com.meetsync.Security;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.meetsync.Entity.User;
import com.meetsync.Repository.UserRepository;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email    = oAuth2User.getAttribute("email");
        String name     = oAuth2User.getAttribute("name");
        String picture  = oAuth2User.getAttribute("picture");
        String googleId = oAuth2User.getAttribute("sub");

        // Google Access Token nikalo
        OAuth2AuthorizedClient authorizedClient = authorizedClientService
            .loadAuthorizedClient("google", authentication.getName());

        String googleAccessToken = null;
        if (authorizedClient != null && authorizedClient.getAccessToken() != null) {
            googleAccessToken = authorizedClient.getAccessToken().getTokenValue();
        }

        // User save karo ya update karo
        User user = userRepository.findByEmail(email)
            .orElse(User.builder()
                .email(email)
                .name(name)
                .picture(picture)
                .googleId(googleId)
                .build());

        user.setName(name);
        user.setPicture(picture);
        if (googleAccessToken != null) {
            user.setGoogleAccessToken(googleAccessToken);
        }

        userRepository.save(user);

        // JWT banao
        String token = jwtUtils.generateToken(email);

        String redirectUrl = frontendUrl + "/auth/callback?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}