package com.ventureverse.ventureverse_api.rag.service;

import java.util.List;

public interface QdrantRestService {

    void createCollection();

    void insertVector(
            String id,
            String title,
            String content,
            List<Float> vector
    );

    List<String> search(
            List<Float> vector
    );
}