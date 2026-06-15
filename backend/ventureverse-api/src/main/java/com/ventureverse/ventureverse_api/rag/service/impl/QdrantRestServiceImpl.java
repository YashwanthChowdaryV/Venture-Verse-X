package com.ventureverse.ventureverse_api.rag.service.impl;

import com.ventureverse.ventureverse_api.rag.config.QdrantConfig;
import com.ventureverse.ventureverse_api.rag.service.QdrantRestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QdrantRestServiceImpl
        implements QdrantRestService {

    private final QdrantConfig config;

    private final RestTemplate restTemplate;

    private static final String
            COLLECTION_NAME =
            "ventureverse_knowledge";

    @Override
    public void createCollection() {

        String url =
                config.getQdrantUrl()
                        + "/collections/"
                        + COLLECTION_NAME;

        HttpHeaders headers =
                new HttpHeaders();

        headers.set(
                "api-key",
                config.getQdrantApiKey()
        );

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String,Object> vectors =
                new HashMap<>();

        vectors.put("size",1024);
        vectors.put("distance","Cosine");

        Map<String,Object> body =
                new HashMap<>();

        body.put(
                "vectors",
                vectors
        );

        HttpEntity<Map<String,Object>>
                request =
                new HttpEntity<>(
                        body,
                        headers
                );

        try {

            restTemplate.exchange(
                    url,
                    HttpMethod.PUT,
                    request,
                    String.class
            );

            System.out.println(
                    "Qdrant collection ready"
            );

        } catch (Exception e) {

            System.out.println(
                    "Collection already exists"
            );
        }
    }
@Override
public List<String> search(
        List<Float> vector) {

    try {

        String url =
                config.getQdrantUrl()
                        + "/collections/ventureverse_knowledge/points/search";

        HttpHeaders headers =
                new HttpHeaders();

        headers.set(
                "api-key",
                config.getQdrantApiKey()
        );

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String,Object> body =
                new HashMap<>();

        body.put(
                "vector",
                vector
        );

        body.put(
                "limit",
                5
        );

        body.put(
                "with_payload",
                true
        );

        HttpEntity<Map<String,Object>>
                request =
                new HttpEntity<>(
                        body,
                        headers
                );

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        request,
                        Map.class
                );

        List<?> result =
                (List<?>)
                        response.getBody()
                                .get("result");

        List<String> documents =
                new ArrayList<>();

        for (Object obj : result) {

            Map<?,?> point =
                    (Map<?,?>) obj;

            Map<?,?> payload =
                    (Map<?,?>)
                            point.get(
                                    "payload"
                            );

            Object content =
                    payload.get(
                            "content"
                    );

            if (content != null) {

                documents.add(
                        content.toString()
                );
            }
        }

        return documents;

    } catch (Exception e) {

        throw new RuntimeException(
                "Qdrant search failed",
                e
        );
    }
}

    @Override
    public void insertVector(
            String id,
            String title,
            String content,
            List<Float> vector) {

        String url =
                config.getQdrantUrl()
                        + "/collections/"
                        + COLLECTION_NAME
                        + "/points";

        HttpHeaders headers =
                new HttpHeaders();

        headers.set(
                "api-key",
                config.getQdrantApiKey()
        );

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String,Object> payload =
                new HashMap<>();

        payload.put(
                "title",
                title
        );

        payload.put(
                "content",
                content
        );

        Map<String,Object> point =
                new HashMap<>();

        point.put(
                "id",
                UUID.randomUUID()
                        .toString()
        );

        point.put(
                "vector",
                vector
        );

        point.put(
                "payload",
                payload
        );

        Map<String,Object> body =
                new HashMap<>();

        body.put(
                "points",
                List.of(point)
        );

        HttpEntity<Map<String,Object>>
                request =
                new HttpEntity<>(
                        body,
                        headers
                );

        restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                String.class
        );

        System.out.println(
                "Inserted into Qdrant"
        );
    }
}