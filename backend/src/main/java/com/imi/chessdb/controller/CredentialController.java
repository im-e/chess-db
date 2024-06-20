package com.imi.chessdb.controller;

import com.imi.chessdb.model.entities.Credential;
import com.imi.chessdb.model.repositories.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/credentials")
public class CredentialController {

    private final CredentialRepository credentialRepository;

    @Autowired
    public CredentialController(final CredentialRepository credentialRepository) {
        this.credentialRepository = credentialRepository;
    }

    @GetMapping
    public List<Credential> getAllCredentials() {
        return credentialRepository.findAll();
    }

    @GetMapping("/{id}")
    public Credential getCredentialById(@PathVariable Integer id) {
        return credentialRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createCredential(@RequestBody Credential credential) throws URISyntaxException {
        Credential savedCredential = credentialRepository.save(credential);
        return ResponseEntity.created(new URI("/credentials/" + savedCredential.getId())).body(savedCredential);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateCredential(@PathVariable Integer id, @RequestBody Credential credential) {
        Credential currentCredential = credentialRepository.findById(id).orElseThrow(RuntimeException::new);
        currentCredential.setName(credential.getName());
        currentCredential.setPassword(credential.getPassword());
        currentCredential.setEmail(credential.getEmail());

        currentCredential = credentialRepository.save(credential);

        return ResponseEntity.ok(currentCredential);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCredential(@PathVariable Integer id) {
        credentialRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
